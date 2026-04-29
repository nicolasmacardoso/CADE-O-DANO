using CadeODano.DTOs;
using CadeODano.Models;
using CadeODano.Services;

namespace CadeODano.Interfaces;

public interface IRiotApiService
{
  public Task<List<string>> GetMatchIdsByPuuid(string puuid);
  public Task<string> GetPuuidByRiotId(PlayerSearchRequestDto playerNickname);
  public Task<MatchSummaryDto?> GetMatchSummaryByMatchId(string matchId, string puuid);
  public Task<RiotMatchResponse> GetMatchById(string matchId);
}