using System.ComponentModel;
using CadeODano.DTOs;
using CadeODano.Helpers;

namespace CadeODano.Builders;

public static class PlayerStatsBuilder
{
  public static PlayerStatsDto Build(
      string puuid,
      string nickname,
      string hashtag,
      int? profileIconId,
      int? summonerLevel,
      List<SummonerEloDto> summonerElos,
      List<MatchSummaryDto> recentMatches,
      List<MostPlayedChampionDto> mostPlayed,
      List<HighestDamageChampionDto> highestDamage)
  {
    return new PlayerStatsDto
    {
      Puuid = puuid,
      SummonerName = $"{nickname}#{hashtag}",
      ProfileIconUrl = profileIconId.HasValue ? DataDragonHelper.GetProfileIcon(profileIconId.Value.ToString()) : null,
      SummonerLevel = summonerLevel?.ToString(),
      RecentMatches = recentMatches,
      MostPlayedChampions = mostPlayed,
      HighestDamageChampions = highestDamage,
      SummonerElos = summonerElos
    };
  }
}