using System.Text.Json.Serialization;

namespace CadeODano.Models.DataDragon;

public class DataDragonRuneSlot
{   
    [JsonPropertyName("runes")]
    public List<DataDragonRune> Runes { get; set; } = [];
}