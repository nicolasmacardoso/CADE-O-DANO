import type { MatchSummary } from "../../types/match";
import type { MatchDetail } from "../../types/matchDetail";

export type SearchMatchResponse = {
    data: MatchDetail;
};

type SearchHistoryData = {
    recentMatches: MatchSummary[];
    puuid: string;
};

export type SearchHistoryResponse = {
    data: SearchHistoryData;
};