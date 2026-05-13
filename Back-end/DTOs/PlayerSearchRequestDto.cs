namespace CadeODano.DTOs;

public record PlayerSearchRequestDto
{
  public string Nickname {get;set;} = null!;
  public string Hashtag {get;set;} = null!;
}