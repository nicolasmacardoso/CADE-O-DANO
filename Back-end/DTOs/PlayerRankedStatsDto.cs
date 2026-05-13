namespace CadeODano.DTOs;

public record PlayerRankedStatsDto
{
    public List<SummonerEloDto> Elos { get; set; } = [];
}