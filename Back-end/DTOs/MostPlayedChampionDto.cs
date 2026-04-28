namespace CadeODano.DTOs;

public record MostPlayedChampionDto
{
  public string ChampionName { get; set; }
  public string ChampionIconUrl {get;set;}
  public int GamesPlayed { get; set; }
}