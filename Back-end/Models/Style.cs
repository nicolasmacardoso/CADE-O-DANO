using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class Style
{
    [JsonPropertyName("description")]
    public string Description { get; set; } = null!;

    [JsonPropertyName("selections")]
    public List<Selection> Selections { get; set; } = null!;

    [JsonPropertyName("style")]
    public int StyleId { get; set; }
}