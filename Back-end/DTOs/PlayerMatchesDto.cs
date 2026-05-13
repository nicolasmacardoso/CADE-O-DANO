namespace CadeODano.DTOs;

public record PlayerMatchesDto
{
    public List<MatchSummaryDto> RecentMatches { get; set; } = [];

}