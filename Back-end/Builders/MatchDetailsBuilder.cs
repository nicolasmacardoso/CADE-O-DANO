using CadeODano.DTOs;

namespace CadeODano.Builders;

public static class MatchDetailsBuilder
{
  public static MatchDetailsDto Build(
      string matchId,
      int gameDuration,
      List<ParticipantDto> participants)
  {
    return new MatchDetailsDto
    {
      MatchId = matchId,
      GameDuration = gameDuration,
      Team1 = participants.Where(x => x.TeamId == 100).ToList(),
      Team2 = participants.Where(x => x.TeamId == 200).ToList()
    };
  }
}