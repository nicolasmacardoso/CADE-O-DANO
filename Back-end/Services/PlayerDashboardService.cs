using AutoMapper;
using CadeODano.Builders;
using CadeODano.DTOs;
using CadeODano.Helpers;
using CadeODano.Interfaces;

namespace CadeODano.Services;

public class PlayerDashboardService : IPlayerDashboardService
{
  private readonly IRiotApiService _riotApiService;
  private readonly IStatsCalculatorService _statsCalculatorService;
  private readonly IMapper _mapper;

  public PlayerDashboardService(IRiotApiService riotApiService, IStatsCalculatorService statsCalculatorService, IMapper mapper)
  {
    _riotApiService = riotApiService;
    _statsCalculatorService = statsCalculatorService;
    _mapper = mapper;
  }

  public async Task<ServiceResult<PlayerStatsDto>> GetPlayerStats(PlayerSearchRequestDto playerNickname, string count)
  {
    try
    {
      var puuid = await _riotApiService.GetPuuidByRiotId(playerNickname);

      var matchIds = await _riotApiService.GetMatchIdsByPuuid(puuid, count);

      var recentMatches = await GetRecentMatchesByPuuid(puuid, matchIds);

      var mostPlayedChampions = _statsCalculatorService.GetMostPlayedChampions(recentMatches);

      var highestDamageChampions = _statsCalculatorService.GetHighestDamageChampions(recentMatches);

      var playerStats = PlayerStatsBuilder.Build(
       puuid,
       playerNickname.Nickname,
       playerNickname.Hashtag,
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

      var participants = matchData.Info.Participants
          .Select(x =>
          {
            var dto = _mapper.Map<ParticipantDto>(x);
            dto.IsSearchedPlayer = x.Puuid == puuid;
            return dto;
          })
          .ToList();

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

  private async Task<List<MatchSummaryDto>> GetRecentMatchesByPuuid(string puuid, List<string> matchIds)
  {
    var tasks = matchIds.Select(matchId => _riotApiService.GetMatchSummaryByMatchId(matchId, puuid));

    var matches = await Task.WhenAll(tasks);

    return matches
        .Where(x => x != null)
        .Select(x => x!)
        .ToList();
  }
}