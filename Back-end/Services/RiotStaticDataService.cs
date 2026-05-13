using CadeODano.DTOs;
using CadeODano.Helpers;
using CadeODano.Interfaces;
using CadeODano.Models.DataDragon;
using Microsoft.Extensions.Caching.Memory;

namespace CadeODano.Services;

public class RiotStaticDataService : IRiotStaticDataService
{
    private readonly IMemoryCache _cache;
    private readonly HttpClient _httpClient;

    public RiotStaticDataService(IMemoryCache cache, HttpClient httpClient)
    {
        _cache = cache;
        _httpClient = httpClient;
    }

    public async Task<List<DataDragonRuneTree>> GetRunesAsync()
    {
        const string cacheKey = "runes";

        if (_cache.TryGetValue(cacheKey, out List<DataDragonRuneTree>? cachedRunes))
            return cachedRunes!;

        var runes = await _httpClient
            .GetFromJsonAsync<List<DataDragonRuneTree>>(
                DataDragonHelper.GetRunes());

        _cache.Set(cacheKey, runes, new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(12)
        });

        return runes!;
    }

    public async Task<RuneDto> GetRuneAsync(int runeId)
    {
        var runes = await GetRunesAsync();

        var rune = runes
            .SelectMany(x => x.Slots)
            .SelectMany(x => x.Runes)
            .FirstOrDefault(x => x.Id == runeId);

        if (rune == null)
            return new RuneDto();

        return new RuneDto
        {
            ShortDesc = rune.ShortDesc,
            Name = rune.Name,
            IconUrl = DataDragonHelper.GetRuneIcon(rune.Icon)
        };
    }

    public async Task<RuneStyleDto> GetRuneStyleAsync(int styleId)
    {
        var runes = await GetRunesAsync();

        var style = runes.FirstOrDefault(x => x.Id == styleId);

        if (style == null)
            return new RuneStyleDto();

        return new RuneStyleDto
        {
            Name = style.Name,
            IconUrl = DataDragonHelper.GetRuneIcon(style.Icon)
        };
    }
}