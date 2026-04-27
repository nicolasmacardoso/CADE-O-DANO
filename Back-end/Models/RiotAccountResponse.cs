using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class RiotAccountResponse
{
  [JsonPropertyName("puuid")]
  public string Puuid { get; set; }
}