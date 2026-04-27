using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class RiotMatchInfo
{
  [JsonPropertyName("participants")]
  public List<RiotParticipant> Participants {get;set;}
}