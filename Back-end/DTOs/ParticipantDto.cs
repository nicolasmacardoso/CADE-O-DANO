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

    public double KDA { get; set; }

    public string KillParticipation { get; set; } = null!;
    public int CS { get; set; }
    public double CSPerMinute { get; set; }

    public ParticipantRunesDto Runes { get; set; } = null!;

    public List<string> ItemIconUrls { get; set; } = [];

    public int TotalDamage { get; set; }
    public int ChampLevel { get; set; }
    public bool Win { get; set; }

    public List<SummonerEloDto>? SummonerElos { get; set; }

    public bool IsSearchedPlayer { get; set; }
    public int TeamId { get; set; }
    public int SubTeamId { get; set; }
}