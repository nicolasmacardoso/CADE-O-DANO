namespace CadeODano.Helpers;
public class DataDragonHelper
{
    private const string DragonVersion = "16.9.1";

    public static string GetChampionIcon(string championName)
        => $"https://ddragon.leagueoflegends.com/cdn/{DragonVersion}/img/champion/{championName}.png";

    public static string GetChampionSplashArt(string championName)
        => $"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{championName}_0.jpg";

    public static string GetProfileIcon(string profileIconId)
        => $"https://ddragon.leagueoflegends.com/cdn/{DragonVersion}/img/profileicon/{profileIconId}.png";
    
    public static string GetRankIcon(string tier)
        => $"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-{tier.ToLower()}.png";
    
}