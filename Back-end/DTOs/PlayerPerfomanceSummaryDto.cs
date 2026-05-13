namespace CadeODano.DTOs;

public record PlayerPerfomanceSummaryDto
{
    public List<MostPlayedChampionDto> MostPlayedChampions { get; set; } = [];

    public List<HighestDamageChampionDto> HighestDamageChampions { get; set; } = [];
}