using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class SummonerEloResponse
{
  [JsonPropertyName("queueType")]
  public string QueueType { get; set; } = null!;

  [JsonPropertyName("tier")]
  public string Tier { get; set; } = null!;

  [JsonPropertyName("rank")]
  public string Rank { get; set; } = null!;

  [JsonPropertyName("leaguePoints")]
  public int LeaguePoints { get; set; }

  [JsonPropertyName("wins")]
  public int Wins { get; set; }

  [JsonPropertyName("losses")]
  public int Losses { get; set; }
}