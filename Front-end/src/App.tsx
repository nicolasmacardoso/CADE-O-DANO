/* REACT */
import { useState } from "react";

/* APIS */
import { buscarHistorico, buscarMatch } from "./services/api";

/* TIPOS */
import type { MatchSummary } from "./types/match";
import type { MatchDetail } from "./types/matchDetail";

/* COMPONENTES */
import LoginPage from "./components/LoginPage";
import HistoryPage from "./components/HistoryPage";
import DetailsPage from "./components/DetailsPage";

type Screen = 'login' | 'historico' | 'detalhes';

function App () {
    const [screen, setScreen] = useState<Screen>("login");
    const [loading, setLoading] = useState(false);
    
    const [puuid, setPuuid] = useState("");

    const [error, setError] = useState("");

    const [matches, setMatches] = useState<MatchSummary[]>([]);
    const [matchDetails, setMatchDetails] = useState<MatchDetail | null>(null);

    async function handleSearchHistory (nick: string, tag: string) {
        try {
            setLoading(true);

            const data = await buscarHistorico(nick, tag);

            setMatches(data.data.recentMatches);

            setPuuid(data.data.puuid);
            
            setScreen('historico');
        } catch (e) {
            console.error(e);
            setError("Erro ao buscar histórico");
        } finally {
            setLoading(false);
        }
    }

    async function handleSearchMatch (matchId: string) {
        try {
            setLoading(true);

            const data = await buscarMatch(matchId, puuid);
            setMatchDetails(data.data);

            setScreen('detalhes');
        } catch (e) {
            console.error(e);

            setError("Erro ao buscar detalhes da partida");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {error && <p>{error}</p>}
            
            {screen === 'login' && (
                <LoginPage
                    onSearch={handleSearchHistory}
                    loading={loading}
                />
            )}
            
            {screen === 'historico' && (
                <HistoryPage
                    onBack={() => setScreen('login')}
                    matches={matches}
                    onSelectMatch={handleSearchMatch}
                />
            )}
            
            {screen === 'detalhes' && (
                <DetailsPage
                    onBack={() => setScreen('historico')}
                    matchDetails={matchDetails}
                />
            )}
        </div>
    )
}

export default App;