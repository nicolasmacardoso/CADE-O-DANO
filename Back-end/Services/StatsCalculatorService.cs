using CadeODano.DTOs;
using CadeODano.Enums;
using CadeODano.Helpers;
using CadeODano.Interfaces;

namespace CadeODano.Services;

public class StatsCalculatorService : IStatsCalculatorService
{
  public List<MostPlayedChampionDto> GetMostPlayedChampions(List<MatchSummaryDto> recentMatches)
  {
    return recentMatches
    .GroupBy(x => x.ChampionName)
    .Select(g => new MostPlayedChampionDto
    {
      ChampionName = g.Key,
      ChampionIconUrl = DataDragonHelper.GetChampionIcon(g.Key),
      GamesPlayed = g.Count()
    })
    .OrderByDescending(x => x.GamesPlayed)
    .Take(3)
    .ToList();
  }

  public List<HighestDamageChampionDto> GetHighestDamageChampions(List<MatchSummaryDto> recentMatches)
  {
    return recentMatches
        .GroupBy(x => x.ChampionName)
        .Select(g => new HighestDamageChampionDto
        {
          ChampionName = g.Key,
          ChampionIconUrl = DataDragonHelper.GetChampionIcon(g.Key),
          HighestDamage = g.Max(x => x.TotalDamage)
        })
        .OrderByDescending(x => x.HighestDamage)
        .Take(3)
        .ToList();
  }

  public static string CalculateWinRate(int wins, int losses)
  {
    int totalGames = wins + losses;

    if (totalGames == 0)
      return "0";

    double winRate = (double)wins / totalGames * 100;

    return Math.Round(winRate).ToString() + "%";
  }

  public MatchResult GetMatchResult(
      bool win,
      int gameDuration)
  {
    if (gameDuration < 300)
      return MatchResult.Remake;

    return win
        ? MatchResult.Victory
        : MatchResult.Defeat;
  }
}
