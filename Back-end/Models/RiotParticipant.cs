using System.Text.Json.Serialization;

public class RiotParticipant
{
  [JsonPropertyName("puuid")]
  public string Puuid {get;set;}

  [JsonPropertyName("championName")]
  public string ChampionName {get;set;}
}