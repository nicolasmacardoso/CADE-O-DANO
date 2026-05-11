using CadeODano.DTOs;
using CadeODano.Enums;

namespace CadeODano.Interfaces;

public interface IStatsCalculatorService
{
  public List<MostPlayedChampionDto> GetMostPlayedChampions(List<MatchSummaryDto> recentMatches);
  public List<HighestDamageChampionDto> GetHighestDamageChampions(List<MatchSummaryDto> recentMatches);
  public MatchResult GetMatchResult(bool playerWin, int gameDuration);

}