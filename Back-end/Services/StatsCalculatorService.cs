using CadeODano.DTOs;
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
      ChampionIconUrl = $"https://ddragon.leagueoflegends.com/cdn/16.5.1/img/champion/{g.Key}.png",
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
          ChampionIconUrl = $"https://ddragon.leagueoflegends.com/cdn/16.5.1/img/champion/{g.Key}.png",
          HighestDamage = g.Max(x => x.TotalDamage)
        })
        .OrderByDescending(x => x.HighestDamage)
        .Take(3)
        .ToList();
  }
}
