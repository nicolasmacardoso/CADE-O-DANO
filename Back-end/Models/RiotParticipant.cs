using System.Text.Json.Serialization;

public class RiotParticipant
{
    [JsonPropertyName("puuid")]
    public string Puuid { get; set; }

    [JsonPropertyName("riotIdGameName")]
    public string SummonerName { get; set; }

    [JsonPropertyName("riotIdTagline")]
    public string Hashtag {get;set;}

    [JsonPropertyName("teamId")]
    public int TeamId { get; set; }

    [JsonPropertyName("championName")]
    public string ChampionName { get; set; }

    [JsonPropertyName("kills")]
    public int Kills { get; set; }

    [JsonPropertyName("deaths")]
    public int Deaths { get; set; }

    [JsonPropertyName("assists")]
    public int Assists { get; set; }

    [JsonPropertyName("totalDamageDealtToChampions")]
    public int TotalDamage { get; set; }

    [JsonPropertyName("win")]
    public bool Win { get; set; }

    [JsonPropertyName("champLevel")]
    public int ChampLevel { get; set; }
}