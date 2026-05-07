/* REACT */
import { useState } from "react";

/* SERVICES */
import { buscarHistorico, buscarMatch } from "./services/api";

/* TIPOS */
import type { MatchSummary } from "./types/match";
import type { MatchDetail } from "./types/matchDetail";

/* COMPONENTES */
import LoginPage from "./components/LoginPage";
import HistoryPage from "./components/HistoryPage";
import DetailsPage from "./components/DetailsPage";

/* HOOKS */
import useRequestState from "./hooks/useRequestState";

type Screen = "login" | "historico" | "detalhes";

function App() {
  const [screen, setScreen] = useState<Screen>("login");

  const [puuid, setPuuid] = useState("");
  const [matches, setMatches] = useState<MatchSummary[]>([]);
  const [matchDetails, setMatchDetails] = useState<MatchDetail | null>(null);

  const { loading, error, run } = useRequestState();

  async function handleSearchHistory(
    nick: string,
    tag: string,
    matchesNumber: string
  ) {
    const data = await run(() =>
      buscarHistorico(nick, tag, matchesNumber)
    );

    if (!data) return;

    setMatches(data.data.recentMatches);
    setPuuid(data.data.puuid);
    
    setScreen("historico");
  }

  async function handleSearchMatch(matchId: string) {
    const data = await run(() =>
      buscarMatch(matchId, puuid)
    );

    if (!data) return;

    setMatchDetails(data.data);
    setScreen("detalhes");
  }

  return (
    <div>
      <div>
        <p>{screen.toUpperCase()}</p>
        {error && <p className="global-error">{error}</p>}
      </div>

      {screen === "login" && (
        <LoginPage
          onSearch={handleSearchHistory}
          loading={loading}
        />
      )}

      {screen === "historico" && (
        <HistoryPage
          onBack={() => setScreen("login")}
          matches={matches}
          onSelectMatch={handleSearchMatch}
        />
      )}

      {screen === "detalhes" && (
        <DetailsPage
          onBack={() => setScreen("historico")}
          matchDetails={matchDetails}
        />
      )}
    </div>
  );
}

export default App;