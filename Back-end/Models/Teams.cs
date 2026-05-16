using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class Teams
{
    [JsonPropertyName("bans")]
    public List<Ban> Ban { get; set; } = [];
    
    [JsonPropertyName("teamId")]
    public int TeamId { get; set; }
}