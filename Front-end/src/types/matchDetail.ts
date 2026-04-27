export type Participant = {
    summonerName: string;
    champion: string;
    damage: number;
    kills: number;
    deaths: number;
    assists: number;
    teamId: number;
};

export type MatchDetail = {
    matchId: string;
    participants: Participant[];
};