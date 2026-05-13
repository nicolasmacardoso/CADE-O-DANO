namespace CadeODano.DTOs;

public record ParticipantRunesDto
{
    public RuneDto Keystone { get; set; } = null!;

    public RuneStyleDto PrimaryStyle { get; set; } = null!;

    public RuneStyleDto SecondaryStyle { get; set; } = null!;
}