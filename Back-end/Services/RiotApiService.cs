using CadeODano.DTOs;

namespace CadeODano.Services;

public class RiotApiService : IRiotApiService
{
  private readonly HttpClient _httpClient;

  public RiotApiService (HttpClient httpClient)
  {
    _httpClient = httpClient;
  }

  public async Task<ServiceResult<PlayerStatsDto>> PuuidByPlayerName (PlayerSearchRequestDto playerNickname) {
    try
    {
      var response = _httpClient.GetAsync($"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{playerNickname.Nickname}/{playerNickname.Hashtag}");
    } catch (Exception ex)
    {
      return ServiceResult<PlayerStatsDto>.Fail($"Erro ao buscar jogador pelo nome de usuário! {ex.Message}");
    }
  }
}