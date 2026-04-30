namespace CadeODano.Helpers;

public class RiotUrlBuilder
{
  public static string GetPuuidByRiotId (string nickname, string hashtag)
      => $"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{nickname}/{hashtag}";

  public static string GetMatchInfoByMatchId(string matchId) 
      => $"https://americas.api.riotgames.com/lol/match/v5/matches/{matchId}";

  public static string GetRecentMatchesByPuuid(string puuid, string count) 
      => $"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count={count}";
}