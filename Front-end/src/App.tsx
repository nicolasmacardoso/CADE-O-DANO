import { useState } from "react";
import { buscarHistorico, buscarMatch } from "./services/api";

import type { MatchSummary } from "./types/match";
import type { MatchDetail } from "./types/matchDetail";

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

    function renderizaPartidas() {
        return matches.map(({ 
            matchId, 
            championName, 
            championIconUrl, 
            kills, 
            deaths, 
            assists, 
            totalDamage, 
            win, 
            champLevel 
        }) => (
            <div key={matchId} onClick={() => handleSearchMatch(matchId)}>
                <p>{win ? "vitória" : "derrota"}</p>
                <img src={championIconUrl} alt={championName} />
                <p>level: {champLevel}</p>
                <p>nome champion: {championName}</p>
                <p>kda: {kills}/{deaths}/{assists}</p>
                <p>dano: {totalDamage} de dano</p>
            </div>
        ));
    }

    function renderizaParticipantes (team: "1" | "2") {
        const thisTeam = `team${team}` as const;
        const participants = matchDetails?.[thisTeam] || [];

        return participants.map(({ 
            summonerName, 
            championIconUrl, 
            championName, 
            kills, 
            deaths, 
            assists, 
            totalDamage, 
            champLevel, 
            isSearchedPlayer
        }) => (
            <div key={summonerName+championName}>
                <div className={isSearchedPlayer ? "border-color:blue" : ""}>
                    <img src={championIconUrl} alt="" />
                    <p>{championName}</p>
                    <p>{champLevel}</p>
                </div>
                <div>
                    <p>Dano total: {totalDamage}</p>
                </div>
                <div>
                    <p>kda: {kills}/{deaths}/{assists}</p>
                </div>
            </div>
        ))
    }

    function renderizaDetalhes () {
        const { 
            matchId, 
            playerWin, 
            queueType, 
            gameDuration 
        } = matchDetails || {}; 
        
        return (
            <div key={matchId}>
                <p>{playerWin ? "Vitória" : "Derrota"}</p>
                <p>{queueType}</p>
                <p>{gameDuration}</p>
                <hr></hr>
                {renderizaParticipantes("1")}
                <hr></hr>
                {renderizaParticipantes("2")}
            </div>
        )
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

                    <button
                        onClick={handleSearchHistory}
                    >
                        Buscar
                    </button>
                </div>
            )}
            
            {screen === 'historico' && (
                renderizaPartidas()
            )}
            
            {screen === 'detalhes' && (
                renderizaDetalhes()
            )}
        </div>
    )
}

export default App;