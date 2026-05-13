using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class Selection
{
    [JsonPropertyName("perk")]
    public int Perk { get; set; }

    [JsonPropertyName("var1")]
    public int Var1 { get; set; }

    [JsonPropertyName("var2")]
    public int Var2 { get; set; }

    [JsonPropertyName("var3")]
    public int Var3 { get; set; }
}