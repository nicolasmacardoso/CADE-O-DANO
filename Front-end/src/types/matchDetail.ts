import type { summonerElo } from "../services/api/types";

type PerkRune = {
    name: string;
    shortDescription?: string;
    shortDesc?: string;
    iconUrl: string;
};

type RuneTree = {
    name: string;
    iconUrl: string;
};

export type Runes = {
    primaryTree?: RuneTree;
    secondaryTree?: RuneTree;
    primaryPerkRunes?: PerkRune[];
    secondaryPerkRunes?: PerkRune[];
    keystone?: PerkRune;
    primaryStyle?: RuneTree;
    secondaryStyle?: RuneTree;
};

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
    runes: Runes;
};

export type MatchDetail = {
    matchId: string;
    queueType: string;
    gameDuration: number;
    playerWin: boolean;
    team1: Participant[];
    team2: Participant[];
};
