using CadeODano.DTOs;
using CadeODano.Helpers;
using CadeODano.Interfaces;
using CadeODano.Models;

namespace CadeODano.Builders;

public class MatchDetailsBuilder
{
  private readonly IRiotStaticDataService _riotStaticDataService;

  public MatchDetailsBuilder(IRiotStaticDataService riotStaticDataService)
  {
    _riotStaticDataService = riotStaticDataService;
  }
  public MatchDetailsDto Build(
    string matchId,
    int queueId,
    int gameDuration,
    long gameStartTimestamp,
    List<Teams> teams,
    List<ParticipantDto> participants)
  {
    var searchedPlayer = participants.FirstOrDefault(x => x.IsSearchedPlayer);

    var groupedTeams = RiotExtensions.IsArenaQueue(queueId)
        ? participants.GroupBy(p => p.SubTeamId)
        : participants.GroupBy(p => p.TeamId);

    return new MatchDetailsDto
    {
      MatchId = matchId,
      QueueType = RiotExtensions.GetQueueDescription(queueId),
      GameDuration = FormatHelper.FormatGameDuration(gameDuration),
      gameStartDate = FormatHelper.FormatUnixMilliseconds(gameStartTimestamp),
      TotalKills = participants.Sum(x => x.Kills),
      PlayerWin = searchedPlayer != null && searchedPlayer.Win,

      Teams = groupedTeams
    .Select(g =>
    {
      Teams? riotTeam = null;

      if (!RiotExtensions.IsArenaQueue(queueId))
      {
        riotTeam = teams.FirstOrDefault(x => x.TeamId == g.Key);
      }

      return new TeamDto
      {
        TeamId = g.Key,

        TotalTeamKills = g.Sum(p => p.Kills),
        TotalTeamDeaths = g.Sum(p => p.Deaths),
        TotalTeamAssists = g.Sum(p => p.Assists),
        
        Participants = g.ToList(),

        Bans = riotTeam?.Ban
              .Select(b => new BanDto
              {
                ChampionName = _riotStaticDataService.GetChampionNameByIdAsync(b.ChampionId.ToString()).Result,
                ChampionIconUrl = DataDragonHelper.GetChampionIcon(_riotStaticDataService.GetChampionNameByIdAsync(b.ChampionId.ToString()).Result)
              })
              .ToList() ?? []
      };
    })
    .ToList()

    };
  }
}