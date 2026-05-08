namespace CadeODano.DTOs;

public record SummonerEloDto
{
  public string? QueueType { get; set; }
  public string? LeagueIconUrl { get; set; }
  public string? Tier { get; set; }
  public string? Rank { get; set; }
  public int LeaguePoints { get; set; }
  public int Wins { get; set; }
  public int Losses { get; set; }
  public string WinRate { get; set; }
}