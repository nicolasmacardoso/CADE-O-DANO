using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class SummonerAccountResponse
{
  [JsonPropertyName("profileIconId")]
  public int? ProfileIconId { get; set; }

  [JsonPropertyName("summonerLevel")]
  public int? SummonerLevel { get; set; }
}