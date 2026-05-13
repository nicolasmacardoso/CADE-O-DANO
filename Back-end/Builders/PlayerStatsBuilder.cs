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
            Profile = new PlayerProfileDto
            {
                Puuid = puuid,
                SummonerName = $"{nickname}#{hashtag}",
                ProfileIconUrl = profileIconId.HasValue
                    ? DataDragonHelper.GetProfileIcon(profileIconId.Value.ToString())
                    : string.Empty,

                SummonerLevel = summonerLevel?.ToString() ?? string.Empty
            },

            RankedStats = new PlayerRankedStatsDto
            {
                Elos = summonerElos
            },

            Matches = new PlayerMatchesDto
            {
                RecentMatches = recentMatches,
                MostPlayedChampions = mostPlayed,
                HighestDamageChampions = highestDamage
            }
        };
    }
}