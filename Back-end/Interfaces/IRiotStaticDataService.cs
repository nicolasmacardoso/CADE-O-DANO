using CadeODano.DTOs;
using CadeODano.Models.DataDragon;

namespace CadeODano.Interfaces;

public interface IRiotStaticDataService
{
    public Task<List<DataDragonRuneTree>> GetRunesAsync();
    public Task<RuneStyleDto> GetRuneStyleAsync(int styleId);
    public Task<RuneDto> GetRuneAsync(int runeId);

}