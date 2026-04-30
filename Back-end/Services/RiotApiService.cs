using AutoMapper;
using CadeODano.DTOs;
using CadeODano.Helpers;
using CadeODano.Interfaces;
using CadeODano.Models;
using Microsoft.Extensions.Caching.Memory;

namespace CadeODano.Services;

public class RiotApiService : IRiotApiService
{
  private readonly HttpClient _httpClient;
  private readonly IMapper _mapper;
  private readonly IMemoryCache _cache;

  public RiotApiService(HttpClient httpClient, IMapper mapper, IMemoryCache cache)
  {
    _httpClient = httpClient;
    _mapper = mapper;
    _cache = cache;
  }

  public async Task<List<string>> GetMatchIdsByPuuid(string puuid, string count)
  {
    var response = await _httpClient.GetAsync(RiotUrlBuilder.GetRecentMatchesByPuuid(puuid, count));

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

    var response = await _httpClient.GetAsync(RiotUrlBuilder.GetPuuidByRiotId(playerNickname.Nickname, playerNickname.Hashtag));

    if (!response.IsSuccessStatusCode)
      throw new Exception("Jogador não encontrado na Riot API");

    var accountData = await response.Content.ReadFromJsonAsync<RiotAccountResponse>();

    if (accountData == null || string.IsNullOrEmpty(accountData.Puuid))
      throw new Exception("Não foi possível obter o PUUID do jogador.");

    return accountData.Puuid;
  }


  public async Task<MatchSummaryDto?> GetMatchSummaryByMatchId(string matchId, string puuid)
  {
    var response = await _httpClient.GetAsync(RiotUrlBuilder.GetMatchInfoByMatchId(matchId));

    if (!response.IsSuccessStatusCode)
      return null;

    var matchData = await response.Content.ReadFromJsonAsync<RiotMatchResponse>();

    var playerData = matchData?.Info?.Participants?
        .FirstOrDefault(x => x.Puuid == puuid);

    if (playerData == null)
      return null;

    var dto = _mapper.Map<MatchSummaryDto>(playerData);
    dto.MatchId = matchId;

    return dto;
  }

  public async Task<RiotMatchResponse?> GetMatchById(string matchId)
  {
    if (_cache.TryGetValue(matchId, out RiotMatchResponse cachedMatch))
      return cachedMatch;

    var response = await _httpClient.GetAsync(RiotUrlBuilder.GetMatchInfoByMatchId(matchId));

    if (!response.IsSuccessStatusCode)
      return null;

    var matchData = await response.Content.ReadFromJsonAsync<RiotMatchResponse>();

    if (matchData != null)
    {
      _cache.Set(matchId, matchData, TimeSpan.FromMinutes(30));
    }

    return matchData;
  }
}