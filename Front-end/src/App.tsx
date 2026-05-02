import { useState } from "react";
import { buscarHistorico, buscarMatch } from "./services/api";

import type { MatchSummary } from "./types/match";
import type { MatchDetail } from "./types/matchDetail";
import MatchCard from "./components/MatchCard";
import MatchDetailsPage from "./components/MatchDetailsPage";

type Screen = 'login' | 'historico' | 'detalhes';

function App () {
    const [screen, setScreen] = useState<Screen>("login");
    const [nick, setNick] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);

    const [matches, setMatches] = useState<MatchSummary[]>([]);
    const [matchDetails, setMatchDetails] = useState<MatchDetail | null>(null);

    async function handleSearchHistory () {
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

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            {screen === 'login' && (
                <div>
                    <input
                        placeholder="Usuário"
                        value={nick}
                        onChange={(e) => setNick(e.target.value)} 
                    />
                    
                    <div className="flex items-center border px-2">
                        <span className="text-gray-500">#</span>

                        <input
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="outline-none flex-1"
                            placeholder="BR1" 
                        />
                    </div>

                    <button onClick={handleSearchHistory}>
                        Buscar
                    </button>
                </div>
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
                    key={matchDetails?.matchId}
                    matchDetails={matchDetails}
                />
            )}
        </div>
    )
}

export default App;