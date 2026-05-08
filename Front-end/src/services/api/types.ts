import type { MatchSummary } from "../../types/match";
import type { MatchDetail } from "../../types/matchDetail";

export type SearchMatchResponse = {
    data: MatchDetail;
};

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

type playerInfo = {
    puuid: string;
    summonerName: string;
    profileIconUrl: string;
    summonerLevel: number;
    summonerElos: summonerElo[];
}

export type SearchHistoryData = playerInfo & {
    recentMatches: MatchSummary[];
    mostPlayedChampions: MostPlayedChampion[];
    highestDamageChampions: HighestDamageChampion[];
};

export type SearchHistoryResponse = {
    data: SearchHistoryData;
};