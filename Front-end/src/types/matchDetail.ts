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

type ParticipantKda = {
    kills: number;
    deaths: number;
    assists: number;
    killParticipation: string;
    cs: number;
    csPerMinute: number;
}

export type Participant = ParticipantKda & {
    summonerName: string;
    summonerHashtag: string;
    championIconUrl: string;
    championSplashArtUrl: string;
    championName: string;
    totalDamage: number;
    champLevel: number;
    isSearchedPlayer: boolean;
    teamId: number;
    itemIconUrls: string[];
    summonerElos?: summonerElo[];
    runes: Runes;
    win?: boolean;
};

export type MatchTeam = {
    teamId: number;
    totalTeamKills: number;
    participants: Participant[];
};

export type MatchDetail = {
    matchId: string;
    queueType: string;
    gameStartDate?: string;
    gameDuration: string | number;
    totalKills?: number;
    playerWin: boolean;
    team1: Participant[];
    team2: Participant[];
    teams?: MatchTeam[];
};
