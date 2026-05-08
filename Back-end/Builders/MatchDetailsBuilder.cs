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
      PlayerWin = searchedPlayer?.Win ?? false,
      QueueType = RiotExtensions.GetQueueDescription(queueId),
      GameDuration = FormatHelper.FormatGameDuration(gameDuration),
      gameStartDate = FormatHelper.FormatUnixMilliseconds(gameStartTimestamp),
      Team1 = participants.Where(x => x.TeamId == 100).ToList(),
      Team2 = participants.Where(x => x.TeamId == 200).ToList()
    };
  }
}