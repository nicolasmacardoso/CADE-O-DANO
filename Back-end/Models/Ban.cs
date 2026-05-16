using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class Ban
{
    [JsonPropertyName("championId")]
    public int ChampionId { get; set; }

}