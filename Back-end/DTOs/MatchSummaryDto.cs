namespace CadeODano.DTOs;

public record MatchSummaryDto
{
    public string MatchId { get; set; }
    public string ChampionName { get; set; }

    public string ChampionIconUrl { get; set; }
    public string gameStartTimestamp { get; set; }
    public int Kills { get; set; }
    public int Deaths { get; set; }
    public int Assists { get; set; }
    public int TotalDamage { get; set; }
    public bool Win { get; set; }
    public int ChampLevel { get; set; }
}
