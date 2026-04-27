using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class RiotMatchResponse
{
  [JsonPropertyName("info")]
  public RiotMatchInfo Info {get;set;}
}