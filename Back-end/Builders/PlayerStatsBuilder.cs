using System.ComponentModel;
using CadeODano.DTOs;

namespace CadeODano.Builders;

public static class PlayerStatsBuilder
{
  public static PlayerStatsDto Build(
      string puuid,
      string nickname,
      string hashtag,
      List<MatchSummaryDto> recentMatches,
      List<MostPlayedChampionDto> mostPlayed,
      List<HighestDamageChampionDto> highestDamage)
  {
    return new PlayerStatsDto
    {
      Puuid = puuid,
      SummonerName = $"{nickname}#{hashtag}",
      RecentMatches = recentMatches,
      MostPlayedChampions = mostPlayed,
      HighestDamageChampions = highestDamage
    };
  }
}