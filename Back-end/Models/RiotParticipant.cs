using System.Text.Json.Serialization;

namespace CadeODano.Models;

public class RiotParticipant
{
    [JsonPropertyName("puuid")]
    public string? Puuid { get; set; }

    [JsonPropertyName("riotIdGameName")]
    public string? SummonerName { get; set; }

    [JsonPropertyName("riotIdTagline")]
    public string? Hashtag { get; set; }

    [JsonPropertyName("teamId")]
    public int TeamId { get; set; }

    [JsonPropertyName("championName")]
    public string? ChampionName { get; set; }

    [JsonPropertyName("kills")]
    public int Kills { get; set; }

    [JsonPropertyName("deaths")]
    public int Deaths { get; set; }

    [JsonPropertyName("assists")]
    public int Assists { get; set; }

    [JsonPropertyName("item0")]
    public int Item0 { get; set; }
    
    [JsonPropertyName("item1")]
    public int Item1 { get; set; }

    [JsonPropertyName("item2")]
    public int Item2 { get; set; }

    [JsonPropertyName("item3")]
    public int Item3 { get; set; }

    [JsonPropertyName("item4")]
    public int Item4 { get; set; }

    [JsonPropertyName("item5")]
    public int Item5 { get; set; }

    [JsonPropertyName("item6")]
    public int Item6 { get; set; }

    [JsonPropertyName("totalDamageDealtToChampions")]
    public int TotalDamage { get; set; }

    [JsonPropertyName("win")]
    public bool Win { get; set; }

    [JsonPropertyName("champLevel")]
    public int ChampLevel { get; set; }
}