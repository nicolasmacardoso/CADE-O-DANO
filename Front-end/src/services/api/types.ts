import type { MatchSummary } from "../../types/match";
import type { MatchDetail } from "../../types/matchDetail";

export type MostPlayedChampion = {
    championName: string;
    championIconUrl: string;
    gamesPlayed: number;
}

export type HighestDamageChampion = {
    championName: string;
    championIconUrl: string;
    highestDamage: number;
}

export type summonerElo = {
    queueType: string;
    leagueIconUrl: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    winRate: string;
}

type PlayerProfileData = {
    puuid: string;
    summonerName: string;
    profileIconUrl: string;
    summonerLevel: string | number;
};

type PlayerRankedStatsData = {
    elos: summonerElo[];
};

type PlayerMatchesData = {
    recentMatches: MatchSummary[];
    
};

type PlayerPerformanceData = {
    mostPlayedChampions: MostPlayedChampion[];
    highestDamageChampions: HighestDamageChampion[]; 
}

export type SearchHistoryApiData = {
    profile: PlayerProfileData;
    rankedStats: PlayerRankedStatsData;
    matches: PlayerMatchesData;
    performanceSummary: PlayerPerformanceData;
};

export type SearchHistoryApiResponse = {
    data: SearchHistoryApiData;
};

export type SearchMatchApiResponse = {
    data: MatchDetail;
};

export type SearchHistoryData = SearchHistoryApiData;
export type SearchHistoryResponse = SearchHistoryApiResponse;
export type SearchMatchResponse = SearchMatchApiResponse;
