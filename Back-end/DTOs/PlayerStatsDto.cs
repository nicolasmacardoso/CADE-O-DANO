namespace CadeODano.DTOs;

public record PlayerStatsDto
{
  public string Puuid { get; set; }
  public string SummonerName { get; set; }
  public bool Win { get; set; }

  public List<MatchSummaryDto> RecentMatches { get; set; }

  public List<MostPlayedChampionDto> MostPlayedChampions { get; set; }

  public List<HighestDamageChampionDto> HighestDamageChampions { get; set; }
}