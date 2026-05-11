export type MatchSummary = {
    matchId: string;
    championName: string;
    championIconUrl: string;
    kills: number;
    deaths: number;
    assists: number;
    totalDamage: number;
    champLevel: number;
    gameStartTimestamp: string;
    result: 0 | 1 | 2;
};