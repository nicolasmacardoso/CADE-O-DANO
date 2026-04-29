using CadeODano.DTOs;

namespace CadeODano.Interfaces;

public interface IStatsCalculatorService
{
  public List<MostPlayedChampionDto> GetMostPlayedChampions(List<MatchSummaryDto> recentMatches);
  public List<HighestDamageChampionDto> GetHighestDamageChampions(List<MatchSummaryDto> recentMatches);
}