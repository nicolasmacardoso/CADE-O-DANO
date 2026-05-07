export type Participant = {
    summonerName: string;
    championIconUrl: string;
    championName: string;
    kills: number;
    deaths: number;
    assists: number;
    totalDamage: number;
    champLevel: number;
    isSearchedPlayer: boolean;
    teamId: number;
};

export type MatchDetail = {
    matchId: string;
    queueType: string,
    gameDuration: number,
    playerWin: boolean,
    team1: Participant[];
    team2: Participant[];
};
