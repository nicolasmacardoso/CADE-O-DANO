using CadeODano.DTOs;
using CadeODano.Interfaces;

namespace CadeODano.Services;

public class PlayerDashboardService : IPlayerDashboardService
{
  private readonly IRiotApiService _riotApiService;
  private readonly IStatsCalculatorService _statsCalculatorService;

  public PlayerDashboardService(IRiotApiService riotApiService, IStatsCalculatorService statsCalculatorService)
  {
    _riotApiService = riotApiService;
    _statsCalculatorService = statsCalculatorService;
  }

  public async Task<ServiceResult<PlayerStatsDto>> GetPlayerStats(PlayerSearchRequestDto playerNickname)
  {
    try
    {
      var puuid = await _riotApiService.GetPuuidByRiotId(playerNickname);

      var matchIds = await _riotApiService.GetMatchIdsByPuuid(puuid);

      var recentMatches = await GetRecentMatchesByPuuid(puuid, matchIds);

      var mostPlayedChampions = _statsCalculatorService.GetMostPlayedChampions(recentMatches);

      var highestDamageChampions = _statsCalculatorService.GetHighestDamageChampions(recentMatches);

      var playerStats = new PlayerStatsDto
      {
        Puuid = puuid,
        SummonerName = $"{playerNickname.Nickname}#{playerNickname.Hashtag}",
        RecentMatches = recentMatches,
        MostPlayedChampions = mostPlayedChampions,
        HighestDamageChampions = highestDamageChampions
      };

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
          .Select(x => new ParticipantDto
          {
            SummonerName = x.SummonerName,
            SummonerHashtag = x.Hashtag,
            ChampionName = x.ChampionName,
            ChampionIconUrl = $"https://ddragon.leagueoflegends.com/cdn/15.9.1/img/champion/{x.ChampionName}.png",
            Kills = x.Kills,
            Deaths = x.Deaths,
            Assists = x.Assists,
            TotalDamage = x.TotalDamage,
            ChampLevel = x.ChampLevel,
            TeamId = x.TeamId,
            IsSearchedPlayer = x.Puuid == puuid
          })
          .ToList();

      var searchedPlayer = participants.FirstOrDefault(x => x.IsSearchedPlayer);

      var dto = new MatchDetailsDto
      {
        MatchId = matchId,
        GameDuration = matchData.Info.GameDuration,
        Team1 = participants.Where(x => x.TeamId == 100).ToList(),
        Team2 = participants.Where(x => x.TeamId == 200).ToList()
      };

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