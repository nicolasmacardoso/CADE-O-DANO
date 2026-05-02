namespace CadeODano.DTOs;

public record MatchDetailsDto
{
  public string MatchId {get;set;}
  public string QueueType {get;set;}
  public string gameStartDate {get;set;}
  public string GameDuration {get;set;}
  public bool PlayerWin {get;set;}

  public List<ParticipantDto> Team1 {get;set;}
  public List<ParticipantDto> Team2 {get;set;}

}