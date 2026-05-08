namespace CadeODano.Helpers;
public class DataDragonHelper
{
    private const string DragonVersion = "15.9.1";

    public static string GetChampionIcon(string championName)
        => $"https://ddragon.leagueoflegends.com/cdn/{DragonVersion}/img/champion/{championName}.png";

    public static string GetChampionSplashArt(string championName)
        => $"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{championName}_0.jpg";
}