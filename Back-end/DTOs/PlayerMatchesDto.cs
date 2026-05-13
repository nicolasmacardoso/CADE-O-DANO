namespace CadeODano.DTOs;

public record PlayerMatchesDto
{
    public List<MatchSummaryDto> RecentMatches { get; set; } = [];

    public List<MostPlayedChampionDto> MostPlayedChampions { get; set; } = [];

    public List<HighestDamageChampionDto> HighestDamageChampions { get; set; } = [];
}