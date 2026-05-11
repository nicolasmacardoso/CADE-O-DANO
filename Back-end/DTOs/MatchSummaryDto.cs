using CadeODano.Enums;

namespace CadeODano.DTOs;

public record MatchSummaryDto
{
    public string? MatchId { get; set; }
    public string? ChampionName { get; set; }

    public string? ChampionIconUrl { get; set; }
    public string? ChampionSplashArtUrl { get; set; }
    public string? GameStartTimestamp { get; set; }
    public int Kills { get; set; }
    public int Deaths { get; set; }
    public int Assists { get; set; }
    public int TotalDamage { get; set; }
    public MatchResult Result { get; set; }
    public int ChampLevel { get; set; }
}
