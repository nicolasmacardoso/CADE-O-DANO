namespace CadeODano.DTOs;

public record HighestDamageChampionDto
{
  public string ChampionName { get; set; }
  public string ChampionIconUrl {get;set;}
  public int HighestDamage { get; set; }
}