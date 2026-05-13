namespace CadeODano.DTOs;

public record MatchDetailsDto
{
  public string MatchId {get;set;} = null!;
  public string QueueType {get;set;} = null!;
  public string gameStartDate {get;set;} = null!;
  public string GameDuration {get;set;} = null!;
  public bool PlayerWin {get;set;}

  public List<ParticipantDto> Team1 {get;set;} = null!;
  public List<ParticipantDto> Team2 {get;set;} = null!;

}