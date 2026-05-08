using AutoMapper;
using CadeODano.DTOs;
using CadeODano.Helpers;
using CadeODano.Models;

namespace CadeODano.Mappings;

public class RiotProfile : Profile
{
    public RiotProfile()
    {
        CreateMap<RiotParticipant, MatchSummaryDto>()
            .ForMember(dest => dest.ChampionIconUrl,
                opt => opt.MapFrom(src => DataDragonHelper.GetChampionIcon(src.ChampionName)))
            .ForMember(dest => dest.ChampionSplashArtUrl,
                opt => opt.MapFrom(src => DataDragonHelper.GetChampionSplashArt(src.ChampionName)));

        CreateMap<RiotParticipant, ParticipantDto>()
            .ForMember(dest => dest.ChampionIconUrl,
                opt => opt.MapFrom(src => DataDragonHelper.GetChampionIcon(src.ChampionName)))
            .ForMember(dest => dest.ChampionSplashArtUrl,
                opt => opt.MapFrom(src => DataDragonHelper.GetChampionSplashArt(src.ChampionName)))
            .ForMember(dest => dest.SummonerHashtag,
                opt => opt.MapFrom(src => src.Hashtag))
            .ForMember(dest => dest.SummonerName,
                opt => opt.MapFrom(src => src.SummonerName));
    }
}