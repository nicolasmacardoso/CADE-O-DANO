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

export type SearchHistoryData = {
    puuid: string;
    summonerName: string;
    recentMatches: MatchSummary[];
    mostPlayedChampions: MostPlayedChampion[];
    highestDamageChampions: HighestDamageChampion[];
};

export type SearchHistoryResponse = {
    data: SearchHistoryData;
};