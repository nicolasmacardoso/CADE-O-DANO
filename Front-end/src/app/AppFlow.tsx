/* REACT */
import { useState } from "react";

/* SERVICES */
import { buscarHistorico, buscarMatch } from "../services/api/riotApi";

/* TIPOS */
import type { MatchDetail } from "../types/matchDetail";

/* HOOKS */
import useRequestState from "../hooks/useRequestState";

/* COMPONENTES */
import LoginPage from "../features/login/components/LoginPage";
import HistoryPage from "../features/history/components/HistoryPage";
import DetailsPage from "../features/match-details/components/DetailsPage";
import AppLayout from "../shared/components/AppLayout";
import PlayerSidebar from "../shared/components/PlayerSidebar";
import type { SearchHistoryData } from "../services/api/types";

type Screen = "login" | "historico" | "detalhes";

function AppFlow () {
    const [playerStats, setPlayerStats] = useState<SearchHistoryData | null>(null);
    const [matchDetails, setMatchDetails] = useState<MatchDetail | null>(null);

    const [screen, setScreen] = useState<Screen>("login");
    const historyRequest = useRequestState();
    const matchRequest = useRequestState();

    async function handleSearchHistory(
        nick: string,
        tag: string,
    ) {
        setMatchDetails(null);
        matchRequest.clearError();

        const response = await historyRequest.run(() =>
            buscarHistorico(nick, tag)
        );

        if (!response) return;

        setPlayerStats(response.data);

        setScreen("historico");
    }

    async function handleSelectMatch(matchId: string) {
        historyRequest.clearError();
        
        if (!playerStats?.puuid) return;

        const response = await matchRequest.run(() =>
            buscarMatch(matchId, playerStats?.puuid)
        );

        if (!response) return;

        setMatchDetails(response.data);

        setScreen("detalhes");
    }

    const playerSidebar = playerStats ? (
        <PlayerSidebar
            summonerName={playerStats.summonerName}
            summonerLevel={playerStats.summonerLevel}
            profileIconUrl={playerStats.profileIconUrl}
            mostPlayedChampions={playerStats.mostPlayedChampions}
            highestDamageChampions={playerStats.highestDamageChampions}
        />
    ) : undefined;

    return (
        <div>
            {screen === "login" && (
                <LoginPage
                    onSearch={handleSearchHistory}
                    historyError={historyRequest.error}
                    loading={historyRequest.loading}
                />
            )}
            {screen === "historico" && (
                <AppLayout sidebar={playerSidebar}>
                    <HistoryPage
                        onBack={() => setScreen("login")}
                        matches={playerStats?.recentMatches || []}
                        isLoadingMatchDetails={matchRequest.loading}
                        matchError={matchRequest.error}
                        onSelectMatch={handleSelectMatch}
                    />
                </AppLayout>
            )}
            {screen === "detalhes" && (
                <AppLayout sidebar={playerSidebar}>
                    <DetailsPage
                        onBack={() => setScreen("historico")}
                        matchDetails={matchDetails}
                    />
                </AppLayout>
            )}
        </div>
    )
}

export default AppFlow;