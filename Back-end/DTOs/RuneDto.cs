namespace CadeODano.DTOs;

public record RuneDto
{
    public string Name { get; set; } = string.Empty;

    public string ShortDesc { get; set; } = string.Empty;

    public string IconUrl { get; set; } = string.Empty;
}