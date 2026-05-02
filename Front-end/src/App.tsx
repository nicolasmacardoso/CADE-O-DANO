import { useState } from "react";
import { buscarHistorico, buscarMatch } from "./services/api";

import type { MatchSummary } from "./types/match";
import type { MatchDetail } from "./types/matchDetail";
import MatchCard from "./components/MatchCard";
import MatchDetailsPage from "./components/MatchDetailsPage";
import LoginPage from "./components/LoginPage";

type Screen = 'login' | 'historico' | 'detalhes';

function App () {
    const [screen, setScreen] = useState<Screen>("login");
    const [loading, setLoading] = useState(false);

    const [matches, setMatches] = useState<MatchSummary[]>([]);
    const [matchDetails, setMatchDetails] = useState<MatchDetail | null>(null);

    async function handleSearchHistory (nick: string, tag: string) {
        try {
            setLoading(true);

            const data = await buscarHistorico(nick, tag);
            setMatches(data.data.recentMatches);

            setScreen('historico');
        } catch (e) {
            console.error(e);
            alert("Erro ao buscar histórico");
        } finally {
            setLoading(false);
        }
    }

    async function handleSearchMatch (matchId: string) {
        try {
            setLoading(true);

            const data = await buscarMatch(matchId);
            setMatchDetails(data.data);

            setScreen('detalhes');
        } catch (e) {
            console.error(e);
            alert("Erro ao buscar detalhes da partida");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {screen === 'login' && (
                <LoginPage
                    onSearch={handleSearchHistory}
                    loading={loading}
                />
            )}
            
            {screen === 'historico' && (
                matches.map((match) => (
                    <MatchCard
                        key={match.matchId}
                        match={match}
                        onClick={handleSearchMatch}
                    />
                ))
            )}
            
            {screen === 'detalhes' && (
                <MatchDetailsPage
                    matchDetails={matchDetails}
                />
            )}
        </div>
    )
}

export default App;