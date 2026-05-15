using CadeODano.DTOs;
using CadeODano.Enums;

namespace CadeODano.Interfaces;

public interface IStatsCalculatorService
{
  public List<MostPlayedChampionDto> GetMostPlayedChampions(List<MatchSummaryDto> recentMatches);
  public List<HighestDamageChampionDto> GetHighestDamageChampions(List<MatchSummaryDto> recentMatches);
  public MatchResult GetMatchResult(bool playerWin, int gameDuration);
  public double CalculateKDA(int kills, int deaths, int assists);
  public string CalculateKillParticipation(int kills, int assists, int teamKills);
  public int CalculateCS(int totalMinionsKilled, int neutralMinionsKilled);
  public double CalculateCSPM(int totalCS, double gameDuration);
  public string CalculateWinRate(int wins, int losses);
}