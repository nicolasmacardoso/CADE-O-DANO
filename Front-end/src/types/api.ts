import type { MatchSummary } from "./match";
import type { MatchDetail } from "./matchDetail";

export type SearchMatchResponse = {
    data: MatchDetail;
}

type dataHistoryResponse = {
    recentMatches: MatchSummary[];
    puuid: string;
}

export type SearchHistoryResponse = {
    data: dataHistoryResponse;
}