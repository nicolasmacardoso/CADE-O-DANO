using CadeODano.DTOs;
using CadeODano.Helpers;

namespace CadeODano.Builders;

public static class MatchDetailsBuilder
{
  public static MatchDetailsDto Build(
      string matchId,
      int queueId,
      int gameDuration,
      long gameStartTimestamp,
      List<ParticipantDto> participants)
  {
    var searchedPlayer = participants.FirstOrDefault(x => x.IsSearchedPlayer);

    return new MatchDetailsDto
    {
      MatchId = matchId,
      QueueType = RiotExtensions.GetQueueDescription(queueId),
      GameDuration = FormatHelper.FormatGameDuration(gameDuration),
      gameStartDate = FormatHelper.FormatUnixMilliseconds(gameStartTimestamp),
      TotalKills = participants.Sum(x => x.Kills),
      Teams = participants
    .GroupBy(p => p.TeamId)
    .Select(g => new TeamDto
    {
      TeamId = g.Key,
      TotalTeamKills = g.Sum(p => p.Kills),
      Participants = g.ToList()
    })
    .ToList()
    };
  }
}