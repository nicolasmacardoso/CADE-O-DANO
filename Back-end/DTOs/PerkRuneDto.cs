namespace CadeODano.DTOs;

public record PerkRuneDto
{
    public string Name { get; set; } = string.Empty;

    public string ShortDescription { get; set; } = string.Empty;

    public string IconUrl { get; set; } = string.Empty;
}