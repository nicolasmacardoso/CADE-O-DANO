using System.Text.RegularExpressions;
using CadeODano.DTOs;
using CadeODano.Models;

namespace CadeODano.Services;

public class RiotApiService : IRiotApiService
{
  private readonly HttpClient _httpClient;

  public RiotApiService(HttpClient httpClient)
  {
    _httpClient = httpClient;
  }

  public async Task<ServiceResult<PlayerStatsDto>> GetPlayerStats(PlayerSearchRequestDto playerNickname)
  {
    try
    {
      var puuid = await GetPuuidByRiotId(playerNickname);

      var matchIds = await GetMatchIdsByPuuid(puuid);

      var recentMatches = await GetRecentMatchesByPuuid(puuid, matchIds);

      var mostPlayedChampions = GetMostPlayedChampions(recentMatches);

      var highestDamageChampions = GetHighestDamageChampions(recentMatches);

      var playerStats = new PlayerStatsDto
      {
        Puuid = puuid,
        SummonerName = playerNickname.Nickname,
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

  private async Task<List<MatchSummaryDto>> GetRecentMatchesByPuuid(string puuid, List<string> matchIds)
  {
    var tasks = matchIds.Select(matchId => GetMatchSummaryByMatchId(matchId, puuid));

    var matches = await Task.WhenAll(tasks);

    return matches
        .Where(x => x != null)
        .Select(x => x!)
        .ToList();
  }

  private async Task<List<string>> GetMatchIdsByPuuid(string puuid)
  {
    var response = await _httpClient.GetAsync(
        $"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=20");

    if (!response.IsSuccessStatusCode)
      throw new Exception("Não foi possível buscar o histórico de partidas.");

    var matchIds = await response.Content.ReadFromJsonAsync<List<string>>();

    if (matchIds == null || !matchIds.Any())
      throw new Exception("Nenhuma partida encontrada para este jogador.");

    return matchIds;
  }

  private async Task<string> GetPuuidByRiotId(PlayerSearchRequestDto playerNickname)
  {
    var nickname = Uri.EscapeDataString(playerNickname.Nickname);
    var hashtag = Uri.EscapeDataString(playerNickname.Hashtag);

    var response = await _httpClient.GetAsync(
      $"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{nickname}/{hashtag}");

    if (!response.IsSuccessStatusCode)
      throw new Exception("Jogador não encontrado na Riot API");

    var accountData = await response.Content.ReadFromJsonAsync<RiotAccountResponse>();

    if (accountData == null || string.IsNullOrEmpty(accountData.Puuid))
      throw new Exception("Não foi possível obter o PUUID do jogador.");

    return accountData.Puuid;
  }


  private async Task<MatchSummaryDto?> GetMatchSummaryByMatchId(string matchId, string puuid)
  {
    var response = await _httpClient.GetAsync(
      $"https://americas.api.riotgames.com/lol/match/v5/matches/{matchId}");

    if (!response.IsSuccessStatusCode)
      return null;

    var matchData = await response.Content.ReadFromJsonAsync<RiotMatchResponse>();

    var playerData = matchData?.Info?.Participants?
        .FirstOrDefault(x => x.Puuid == puuid);

    if (playerData == null)
      return null;

    return new MatchSummaryDto
    {
      ChampionName = playerData.ChampionName,
      ChampionIconUrl = $"https://ddragon.leagueoflegends.com/cdn/16.5.1/img/champion/{playerData.ChampionName}.png",
      Kills = playerData.Kills,
      Deaths = playerData.Deaths,
      Assists = playerData.Assists,
      TotalDamage = playerData.TotalDamage,
      Win = playerData.Win,
      ChampLevel = playerData.ChampLevel
    };
  }

  private List<MostPlayedChampionDto> GetMostPlayedChampions(List<MatchSummaryDto> recentMatches)
  {
    return recentMatches
    .GroupBy(x => x.ChampionName)
    .Select(g => new MostPlayedChampionDto
    {
      ChampionName = g.Key,
      ChampionIconUrl = $"https://ddragon.leagueoflegends.com/cdn/16.5.1/img/champion/{g.Key}.png",
      GamesPlayed = g.Count()
    })
    .OrderByDescending(x => x.GamesPlayed)
    .Take(3)
    .ToList();
  }

  private List<HighestDamageChampionDto> GetHighestDamageChampions(List<MatchSummaryDto> recentMatches)
  {
    return recentMatches
        .GroupBy(x => x.ChampionName)
        .Select(g => new HighestDamageChampionDto
        {
          ChampionName = g.Key,
          ChampionIconUrl = $"https://ddragon.leagueoflegends.com/cdn/16.5.1/img/champion/{g.Key}.png",
          HighestDamage = g.Max(x => x.TotalDamage)
        })
        .OrderByDescending(x => x.HighestDamage)
        .Take(3)
        .ToList();
  }
}