using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class Challenges
{
    [JsonPropertyName("gameLength")]
    public double GameLength { get; set; }
}