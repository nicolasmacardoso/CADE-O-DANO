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
      ChampionName = g.Key!,
      ChampionIconUrl = DataDragonHelper.GetChampionIcon(g.Key!),
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
          ChampionName = g.Key!,
          ChampionIconUrl = DataDragonHelper.GetChampionIcon(g.Key!),
          HighestDamage = g.Max(x => x.TotalDamage)
        })
        .OrderByDescending(x => x.HighestDamage)
        .Take(3)
        .ToList();
  }

  public string CalculateWinRate(int wins, int losses)
  {
    int totalGames = wins + losses;

    if (totalGames == 0)
      return "0";

    double winRate = (double)wins / totalGames * 100;

    return Math.Round(winRate).ToString() + "%";
  }

  public double CalculateKDA(int kills, int deaths, int assists)
  {
    if (deaths == 0)
      return kills + assists;

    return Math.Round((double)(kills + assists) / deaths, 2);
  }

  public string CalculateKillParticipation(int kills, int assists, int teamKills)
  {
    if (teamKills == 0)
      return "0%";

    return Math.Round(((double)(kills + assists) / teamKills) * 100, 2).ToString() + "%";
  }

  public int CalculateCS(int totalMinionsKilled, int neutralMinionsKilled)
  {
    return totalMinionsKilled + neutralMinionsKilled;
  }

  public double CalculateCSPM(int cs, double gameDurationInSeconds)
  {
    if (gameDurationInSeconds == 0)
      return 0;

    double gameDurationInMinutes = gameDurationInSeconds / 60.0;
    return Math.Round(cs / gameDurationInMinutes, 2);
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
