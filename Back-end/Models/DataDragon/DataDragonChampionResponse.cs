using System.Text.Json.Serialization;

namespace CadeODano.Models.DataDragon;

public class DataDragonChampionResponse
{
    [JsonPropertyName("data")]
    public Dictionary<string, DataDragonChampion> Data { get; set; } = [];
}