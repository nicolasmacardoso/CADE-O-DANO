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
      var promisedPuuid = await _httpClient.GetAsync(
        $"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{playerNickname.Nickname}/{playerNickname.Hashtag}");

      if (!promisedPuuid.IsSuccessStatusCode)
        return ServiceResult<PlayerStatsDto>.Fail("Jogador não encontrado.");

      var accountData = await promisedPuuid.Content.ReadFromJsonAsync<RiotAccountResponse>();

      var puuid = accountData?.Puuid;

      var promisedMatchIds = await _httpClient.GetAsync(
        $"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=60"
      );

      if (!promisedMatchIds.IsSuccessStatusCode)
        return ServiceResult<PlayerStatsDto>.Fail("Não foi possível carregar as partidas do usuário.");

      var matchIds = await promisedMatchIds.Content.ReadFromJsonAsync<List<string>>();

      var championsPlayed = new List<string>();

      foreach (var matchId in matchIds)
      {
        var promisedMatch = await _httpClient.GetAsync(
          $"https://americas.api.riotgames.com/lol/match/v5/matches/{matchId}"
        );
        if (!promisedMatch.IsSuccessStatusCode)
          continue;

        var matchData = await promisedMatch.Content.ReadFromJsonAsync<RiotMatchResponse>();

        var playerData = matchData?.Info?.Participants?
            .FirstOrDefault(x => x.Puuid == puuid);

        if (playerData != null)
          championsPlayed.Add(playerData.ChampionName);
      }

      return ServiceResult<PlayerStatsDto>.Success(new PlayerStatsDto
      {
        Puuid = puuid,
        ChampionsPlayed = championsPlayed
      });
    }
    catch (Exception ex)
    {
      return ServiceResult<PlayerStatsDto>.Fail($"Erro ao buscar jogador pelo nome de usuário! {ex.Message}");
    }
  }

  public async Task
}