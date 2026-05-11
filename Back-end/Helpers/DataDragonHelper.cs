using CadeODano.Configuration;
using Microsoft.Extensions.Options;

namespace CadeODano.Helpers;

public class DataDragonHelper
{
    private static readonly string version = "16.9.1";

    public static string GetChampionIcon(string championName)
        => $"https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{championName}.png";

    public static string GetChampionSplashArt(string championName)
        => $"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{championName}_0.jpg";

    public static string GetProfileIcon(string profileIconId)
        => $"https://ddragon.leagueoflegends.com/cdn/{version}/img/profileicon/{profileIconId}.png";

    public static string GetRankIcon(string tier)
        => $"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-{tier.ToLower()}.png";

    public static string GetItemIcon(string itemId)
        => $"https://ddragon.leagueoflegends.com/cdn/{version}/img/item/{itemId}.png";

    public static List<string> GetItemIconUrls(params int[] itemIds)
    {
        var itemIconUrls = new List<string>();

        foreach (var itemId in itemIds)
        {
            if (itemId <= 0)
                continue;

            itemIconUrls.Add(GetItemIcon(itemId.ToString()));
        }

        return itemIconUrls;
    }
}