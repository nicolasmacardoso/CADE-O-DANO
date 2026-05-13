using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class Perks
{
    [JsonPropertyName("statPerks")]
    public StatPerks StatPerks { get; set; } = null!;

    [JsonPropertyName("styles")]
    public List<Style> Styles { get; set; } = null!;
}