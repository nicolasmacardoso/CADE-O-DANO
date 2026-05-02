using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class RiotMatchInfo
{
  [JsonPropertyName("queueId")]
  public int QueueId { get; set; }

  [JsonPropertyName("gameDuration")]
  public int GameDuration { get; set; }

  [JsonPropertyName("gameStartTimestamp")]
  public long gameStartTimestamp{get;set;}

  [JsonPropertyName("participants")]
  public List<RiotParticipant> Participants { get; set; }
}