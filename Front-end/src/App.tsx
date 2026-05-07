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

  const historyRequest = useRequestState();
  const matchRequest = useRequestState();

  async function handleSearchHistory(
    nick: string,
    tag: string,
    matchesNumber: string
  ) {
    matchRequest.clearError();

    const data = await historyRequest.run(() =>
      buscarHistorico(nick, tag, matchesNumber)
    );

    if (!data) return;

    setMatches(data.data.recentMatches);
    setPuuid(data.data.puuid);
    
    setScreen("historico");
  }

  async function handleSearchMatch(matchId: string) {
    historyRequest.clearError();

    const data = await matchRequest.run(() =>
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
        {historyRequest.error && <p className="history-error">{historyRequest.error}</p>}
        {matchRequest.error && <p className="match-error">{matchRequest.error}</p>}
      </div>

      {screen === "login" && (
        <LoginPage
          onSearch={handleSearchHistory}
          loading={historyRequest.loading}
        />
      )}

      {screen === "historico" && (
        <HistoryPage
          onBack={() => setScreen("login")}
          matches={matches}
          matchLoading={matchRequest.loading}
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