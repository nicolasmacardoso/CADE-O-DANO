namespace CadeODano.DTOs;

public record ParticipantRunesDto
{
    public RuneTreeDto PrimaryTree { get; set; } = null!;

    public RuneTreeDto SecondaryTree { get; set; } = null!;

    public List<PerkRuneDto> PrimaryPerkRunes { get; set; } = [];

    public List<PerkRuneDto> SecondaryPerkRunes { get; set; } = [];
}