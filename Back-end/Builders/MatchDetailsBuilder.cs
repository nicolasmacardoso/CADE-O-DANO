using CadeODano.DTOs;
using CadeODano.Helpers;
using CadeODano.Interfaces;

namespace CadeODano.Builders;

public class MatchDetailsBuilder
{
  private readonly IStatsCalculatorService _statsCalculatorService;

  public MatchDetailsBuilder(IStatsCalculatorService statsCalculatorService)
  {
    _statsCalculatorService = statsCalculatorService;
  }

  public MatchDetailsDto Build(
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
      PlayerWin = searchedPlayer != null && searchedPlayer.Win,
      Teams = participants
    .GroupBy(p => p.TeamId)
    .Select(g => new TeamDto
    {
      TeamId = g.Key,
      TotalTeamKills = g.Sum(p => p.Kills),
      TeamKDA = _statsCalculatorService.CalculateKDA(g.Sum(p => p.Kills), g.Sum(p => p.Deaths), g.Sum(p => p.Assists)),
      Participants = g.ToList()
    })
    .ToList()
    };
  }
}