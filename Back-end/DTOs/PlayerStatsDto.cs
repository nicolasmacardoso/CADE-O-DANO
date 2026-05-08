namespace CadeODano.DTOs;

public record PlayerStatsDto
{
  public string? Puuid { get; set; }
  public string? SummonerName { get; set; }
  public string? SummonerLevel { get; set; }
  public string? ProfileIconUrl { get; set; }

  public List<MatchSummaryDto>? RecentMatches { get; set; }

  public List<MostPlayedChampionDto>? MostPlayedChampions { get; set; }

  public List<HighestDamageChampionDto>? HighestDamageChampions { get; set; }
}