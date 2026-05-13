using AutoMapper;
using CadeODano.Builders;
using CadeODano.DTOs;
using CadeODano.Interfaces;

namespace CadeODano.Services;

public class PlayerDashboardService : IPlayerDashboardService
{
  private readonly IRiotApiService _riotApiService;
  private readonly IStatsCalculatorService _statsCalculatorService;
  private readonly IMapper _mapper;
  private readonly IRiotStaticDataService _riotStaticDataService;

  public PlayerDashboardService(
    IRiotApiService riotApiService,
    IStatsCalculatorService statsCalculatorService,
    IMapper mapper,
    IRiotStaticDataService riotStaticDataService)
  {
    _riotApiService = riotApiService;
    _statsCalculatorService = statsCalculatorService;
    _mapper = mapper;
    _riotStaticDataService = riotStaticDataService;
  }

  public async Task<ServiceResult<PlayerStatsDto>> GetPlayerStats(PlayerSearchRequestDto playerNickname, string count)
  {
    try
    {
      var puuid = await _riotApiService.GetPuuidByRiotId(playerNickname);

      var summonerInfo = await _riotApiService.GetSummonerAccountInfoByPuuid(puuid);

      var summonerElo = await _riotApiService.GetSummonerEloByPuuid(puuid);

      var matchIds = await _riotApiService.GetMatchIdsByPuuid(puuid, count);

      var recentMatches = await GetRecentMatchesByPuuid(puuid, matchIds);

      var mostPlayedChampions = _statsCalculatorService.GetMostPlayedChampions(recentMatches);

      var highestDamageChampions = _statsCalculatorService.GetHighestDamageChampions(recentMatches);

      var playerStats = PlayerStatsBuilder.Build(
       puuid,
       playerNickname.Nickname,
       playerNickname.Hashtag,
       summonerInfo.ProfileIconId,
       summonerInfo.SummonerLevel,
       summonerElo,
       recentMatches,
       mostPlayedChampions,
       highestDamageChampions);

      return ServiceResult<PlayerStatsDto>.Success(playerStats);
    }
    catch (Exception ex)
    {
      return ServiceResult<PlayerStatsDto>.Fail($"Erro ao buscar jogador pelo nome de usuário! {ex.Message}");
    }
  }

  public async Task<ServiceResult<MatchDetailsDto>> GetMatchDetails(string matchId, string puuid)
  {
    try
    {
      var matchData = await _riotApiService.GetMatchById(matchId);

      if (matchData == null)
        return ServiceResult<MatchDetailsDto>.Fail("Partida não encontrada.");

      var teamKills = matchData.Info.Participants
        .GroupBy(p => p.TeamId)
        .ToDictionary(
        g => g.Key,
        g => g.Sum(x => x.Kills));

      var participantsTasks = matchData.Info.Participants
          .Select(async x =>
          {
            var dto = _mapper.Map<ParticipantDto>(x);

            dto.IsSearchedPlayer = x.Puuid == puuid;

            dto.SummonerElos = await _riotApiService.GetSummonerEloByPuuid(x.Puuid!);

            dto.KillParticipation = StatsCalculatorService
              .CalculateKillParticipation(
              x.Kills,
              x.Assists,
              teamKills[x.TeamId]);

            var primaryStyle = x.Perks.Styles[0];
            var secondaryStyle = x.Perks.Styles[1];

            var primaryRunes = await Task.WhenAll(
              primaryStyle.Selections.Select(x =>
                    _riotStaticDataService.GetRuneAsync(x.Perk)));

            var secondaryRunes = await Task.WhenAll(
                secondaryStyle.Selections.Select(x =>
                    _riotStaticDataService.GetRuneAsync(x.Perk)));

            dto.Runes = new ParticipantRunesDto
            {
              PrimaryTree = await _riotStaticDataService
                    .GetRuneStyleAsync(primaryStyle.StyleId),

              SecondaryTree = await _riotStaticDataService
                    .GetRuneStyleAsync(secondaryStyle.StyleId),

              PrimaryPerkRunes = primaryRunes.ToList(),

              SecondaryPerkRunes = secondaryRunes.ToList()
            };

            return dto;
          });

      var participants = (await Task.WhenAll(participantsTasks)).ToList();

      var dto = MatchDetailsBuilder.Build(
          matchId,
          matchData.Info.QueueId,
          matchData.Info.GameDuration,
          matchData.Info.gameStartTimestamp,
          participants);

      return ServiceResult<MatchDetailsDto>.Success(dto);
    }
    catch (Exception ex)
    {
      return ServiceResult<MatchDetailsDto>.Fail(ex.Message);
    }
  }

  private async Task<List<MatchSummaryDto>> GetRecentMatchesByPuuid(
      string puuid,
      List<string> matchIds)
  {
    SemaphoreSlim semaphore = new(10);

    var tasks = matchIds.Select(async matchId =>
    {
      await semaphore.WaitAsync();

      try
      {
        return await _riotApiService
            .GetMatchSummaryByMatchId(matchId, puuid);
      }
      finally
      {
        semaphore.Release();
      }
    });

    var matches = await Task.WhenAll(tasks);

    return matches
        .Where(x => x != null)
        .Select(x => x!)
        .ToList();
  }
}