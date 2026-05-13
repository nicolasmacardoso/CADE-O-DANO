namespace CadeODano.DTOs;

public record MatchDetailsDto
{
  public string MatchId { get; set; } = null!;
  public string QueueType { get; set; } = null!;
  public string gameStartDate { get; set; } = null!;
  public string GameDuration { get; set; } = null!;
  public int TotalKills { get; set; }

  public List<TeamDto> Teams { get; set; } = [];

}