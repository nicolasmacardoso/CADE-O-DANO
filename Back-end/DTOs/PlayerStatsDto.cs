namespace CadeODano.DTOs;

public record PlayerStatsDto
{
  public string Puuid {get;set;}
  public List<string> ChampionsPlayed {get;set;}
}