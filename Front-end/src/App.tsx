import { useState } from "react";
import { buscarHistorico, buscarMatch } from "./services/api";
import type { MatchSummary } from "./types/match";
import type { MatchDetail } from "./types/matchDetail";

// tipo de telas
type Screen = "login" | "history" | "match";

function App() {
    const [screen, setScreen] = useState<Screen>("login");

    const [nick, setNick] = useState("");
    const [tag, setTag] = useState("");

    const [matches, setMatches] = useState<MatchSummary[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<MatchDetail | null>(null);

    const [loading, setLoading] = useState(false);

    // 🔍 buscar histórico
    const handleSearch = async () => {
        try {
            setLoading(true);

            const data = await buscarHistorico(nick, tag);
            setMatches(data);

            setScreen("history");
        } catch (error) {
            console.error(error);
            alert("erro ao buscar histórico");
        } finally {
            setLoading(false);
        }
    };

    // 🎮 buscar detalhe da partida
    const handleSelectMatch = async (matchId: string) => {
        try {
            setLoading(true);

            const data = await buscarMatch(matchId);
            setSelectedMatch(data);

            setScreen("match");
        } catch (error) {
            console.error(error);
            alert("erro ao buscar partida");
        } finally {
            setLoading(false);
        }
    };

    // 🔙 voltar
    const handleBack = () => {
        setScreen("history");
        setSelectedMatch(null);
    };

    return (
        <div>
            {loading && <p>Carregando...</p>}

            {screen === "login" && (
                <div>
                    <h1>Login</h1>

                    <input
                        placeholder="Nick"
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                    />

                    <input
                        placeholder="Tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />

                    <button onClick={handleSearch}>
                        Buscar
                    </button>
                </div>
            )}

            {screen === "history" && (
                <div>
                    <h1>Histórico</h1>

                    {matches.map((match) => (
                        <div
                            key={match.matchId}
                            onClick={() => handleSelectMatch(match.matchId)}
                            style={{ cursor: "pointer", marginBottom: "10px" }}
                        >
                            <p>{match.champion}</p>
                            <p>{match.kills}/{match.deaths}/{match.assists}</p>
                            <p>Dano: {match.damage}</p>
                        </div>
                    ))}
                </div>
            )}

            {screen === "match" && selectedMatch && (
                <div>
                    <button onClick={handleBack}>Voltar</button>

                    <h1>Detalhe da Partida</h1>

                    {selectedMatch.participants.map((p, index) => (
                        <div key={index}>
                            <p>{p.summonerName}</p>
                            <p>{p.champion}</p>
                            <p>{p.kills}/{p.deaths}/{p.assists}</p>
                            <p>Dano: {p.damage}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;