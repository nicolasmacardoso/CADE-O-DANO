using CadeODano.DTOs;
using CadeODano.Models.DataDragon;

namespace CadeODano.Interfaces;

public interface IRiotStaticDataService
{
    public Task<List<DataDragonRuneTree>> GetRunesAsync();
    public Task<RuneTreeDto> GetRuneStyleAsync(int styleId);
    public Task<PerkRuneDto> GetRuneAsync(int runeId);

}