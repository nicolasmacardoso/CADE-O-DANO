namespace CadeODano.DTOs;

public record PlayerSearchRequestDto
{
  public string Nickname {get;set;}
  public string Hashtag {get;set;}
}