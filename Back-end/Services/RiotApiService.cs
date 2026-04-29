using CadeODano.DTOs;
using CadeODano.Interfaces;
using CadeODano.Models;

namespace CadeODano.Services;

public class RiotApiService : IRiotApiService
{
  private readonly HttpClient _httpClient;

  public RiotApiService(HttpClient httpClient)
  {
    _httpClient = httpClient;
  }

  public async Task<List<string>> GetMatchIdsByPuuid(string puuid)
  {
    var response = await _httpClient.GetAsync(
        $"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=40");

    if (!response.IsSuccessStatusCode)
      throw new Exception("Não foi possível buscar o histórico de partidas.");

    var matchIds = await response.Content.ReadFromJsonAsync<List<string>>();

    if (matchIds == null || !matchIds.Any())
      throw new Exception("Nenhuma partida encontrada para este jogador.");

    return matchIds;
  }

  public async Task<string> GetPuuidByRiotId(PlayerSearchRequestDto playerNickname)
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


  public async Task<MatchSummaryDto?> GetMatchSummaryByMatchId(string matchId, string puuid)
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
      MatchId = matchId,
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

  public async Task<RiotMatchResponse> GetMatchById(string matchId)
  {
    var response = await _httpClient.GetAsync(
      $"https://americas.api.riotgames.com/lol/match/v5/matches/{matchId}");

    if (!response.IsSuccessStatusCode)
      return null;
    
    return await response.Content.ReadFromJsonAsync<RiotMatchResponse>();
  }
}