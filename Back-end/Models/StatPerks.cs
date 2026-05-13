using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class StatPerks
{
    [JsonPropertyName("offense")]
    public int Offense { get; set; }

    [JsonPropertyName("flex")]
    public int Flex { get; set; }

    [JsonPropertyName("defense")]
    public int Defense { get; set; }
}