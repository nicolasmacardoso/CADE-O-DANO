using System.Text.Json.Serialization;

namespace CadeODano.Models.DataDragon;

public class DataDragonRuneTree
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("key")]
    public string Key { get; set; } = string.Empty;

    [JsonPropertyName("icon")]
    public string Icon { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("slots")]
    public List<DataDragonRuneSlot> Slots { get; set; } = [];
}