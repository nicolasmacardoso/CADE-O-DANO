namespace CadeODano.DTOs;

public record TeamDto
{
    public int TeamId { get; set; }
    public int TotalTeamKills { get; set; }
    public List<ParticipantDto> Participants { get; set; } = null!;
}