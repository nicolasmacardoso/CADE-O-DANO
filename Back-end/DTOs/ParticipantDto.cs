namespace CadeODano.DTOs;

public record ParticipantDto
{
    public string? SummonerName { get; set; }
    public string? SummonerHashtag { get; set; }
    public string? ChampionName { get; set; }
    public string? ChampionIconUrl { get; set; }
    public string? ChampionSplashArtUrl { get; set; }

    public int Kills { get; set; }
    public int Deaths { get; set; }
    public int Assists { get; set; }

    public int TotalDamage { get; set; }
    public int ChampLevel { get; set; }
    public bool Win { get; set; }

    public bool IsSearchedPlayer { get; set; }
    public int TeamId { get; set; }
}