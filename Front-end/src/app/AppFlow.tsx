/* REACT */
import { useEffect, useState } from "react";

/* SERVICES */
import { buscarHistorico, buscarMatch } from "../services/api/riotApi";

/* TIPOS */
import type { MatchDetail } from "../types/matchDetail";
import type { SearchHistoryData } from "../services/api/types";

/* HOOKS */
import useRequestState from "../hooks/useRequestState";

/* COMPONENTES */
import LoginPage from "../features/login/components/LoginPage";
import HistoryPage from "../features/history/components/HistoryPage";
import DetailsPage from "../features/match-details/components/DetailsPage";
import AppLayout from "../shared/components/AppLayout";
import PlayerSidebar from "../shared/components/PlayerSidebar";

/* STORAGE */
import { 
    clearCurrentPlayer,
    getCurrentPlayer, 
    getCurrentPlayerHistory,
    getSearchedPlayers, 
    saveCurrentPlayer, 
    saveCurrentPlayerHistory,
    saveSearchedPlayer, 
    type StoredPlayer 
} from "../services/storage/playerStorage";

type Screen = "login" | "historico" | "detalhes";

function AppFlow () {
    const [playerStats, setPlayerStats] = useState<SearchHistoryData | null>(() => getCurrentPlayerHistory());
    const [matchDetails, setMatchDetails] = useState<MatchDetail | null>(null);

    const [screen, setScreen] = useState<Screen>(() => playerStats ? "historico" : "login");

    const [searchedPlayers, setSearchedPlayers] = useState<StoredPlayer[]>([]);

    const historyRequest = useRequestState();
    const matchRequest = useRequestState();

    useEffect(() => {
        setSearchedPlayers(getSearchedPlayers());

        if (playerStats) return;

        const storedPlayer = getCurrentPlayer();

        if (!storedPlayer) return;

        handleSearchHistory(storedPlayer.nick, storedPlayer.tag);
    }, []);

    async function handleSearchHistory(
        nick: string | null,
        tag: string | null,
    ) {
        if (!nick || !tag) return;

        setMatchDetails(null);
        matchRequest.clearError();

        const response = await historyRequest.run(() =>
            buscarHistorico(nick, tag)
        );

        if (!response) return;

        setPlayerStats(response.data);
        saveCurrentPlayerHistory(response.data);

        const icon = response.data.profileIconUrl;

        const searchedPlayer = { profileIconUrl: icon, nick, tag };

        saveCurrentPlayer(searchedPlayer);
        saveSearchedPlayer(searchedPlayer);
        setSearchedPlayers(getSearchedPlayers());

        setScreen("historico");
    };

    async function handleSelectMatch(matchId: string) {
        historyRequest.clearError();
        
        if (!playerStats?.puuid) return;

        const response = await matchRequest.run(() =>
            buscarMatch(matchId, playerStats?.puuid)
        );

        if (!response) return;

        setMatchDetails(response.data);

        setScreen("detalhes");
    };

    async function handleRefreshHistory() {
        const storedPlayer = getCurrentPlayer();

        await handleSearchHistory(
            storedPlayer?.nick || null,
            storedPlayer?.tag || null,
        );
    }

    function handleBackToLogin() {
        setPlayerStats(null);
        setMatchDetails(null);
        clearCurrentPlayer();
        setScreen("login");
    }

    const playerSidebar = playerStats ? (
        <PlayerSidebar
            summonerName={playerStats.summonerName}
            summonerLevel={playerStats.summonerLevel}
            profileIconUrl={playerStats.profileIconUrl}
            mostPlayedChampions={playerStats.mostPlayedChampions}
            highestDamageChampions={playerStats.highestDamageChampions}
            summonerElos={playerStats.summonerElos}
        />
    ) : undefined;

    return (
        <div>
            {screen === "login" && (
                <LoginPage
                    onSearch={handleSearchHistory}
                    historyError={historyRequest.error}
                    loading={historyRequest.loading}
                    searchedPlayers={searchedPlayers}
                />
            )}
            {screen === "historico" && (
                <AppLayout sidebar={playerSidebar}>
                    <HistoryPage
                        onBack={handleBackToLogin}
                        onRefresh={handleRefreshHistory}
                        matches={playerStats?.recentMatches || []}
                        isRefreshingHistory={historyRequest.loading}
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
    );
};

export default AppFlow;
