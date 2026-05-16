namespace CadeODano.DTOs;

public record TeamDto
{
    public int TeamId { get; set; }
    public int TotalTeamKills { get; set; }
    public int TotalTeamDeaths { get; set; }
    public int TotalTeamAssists { get; set; }
    public List<BanDto> Bans { get; set; } = null!;
    public List<ParticipantDto> Participants { get; set; } = null!;
}