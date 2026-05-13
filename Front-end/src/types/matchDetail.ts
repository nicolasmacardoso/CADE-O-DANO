import type { summonerElo } from "../services/api/types";

export type Participant = {
    summonerName: string;
    championIconUrl: string;
    championSplashArtUrl: string;
    championName: string;
    kills: number;
    deaths: number;
    assists: number;
    totalDamage: number;
    champLevel: number;
    isSearchedPlayer: boolean;
    teamId: number;
    itemIconUrls: string[];
    summonerElos?: summonerElo[];
};

export type MatchDetail = {
    matchId: string;
    queueType: string;
    gameDuration: number;
    playerWin: boolean;
    team1: Participant[];
    team2: Participant[];
};
