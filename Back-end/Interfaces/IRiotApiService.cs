using CadeODano.DTOs;
using CadeODano.Services;

namespace CadeODano;

public interface IRiotApiService
{
  public Task<ServiceResult<PlayerStatsDto>> GetPlayerStats(PlayerSearchRequestDto playerNickname);
}