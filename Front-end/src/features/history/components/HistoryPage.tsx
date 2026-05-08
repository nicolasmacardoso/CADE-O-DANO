import type { MatchSummary } from "../../../types/match";
import BackButton from "../../../shared/components/BackButton";
import MatchCard from "./MatchCard";

type Props = {
    onBack: () => void;
    matches: MatchSummary[];
    onSelectMatch: (matchId: string) => Promise<void>;
    isLoadingMatchDetails: boolean;
    matchError: string;
}

function HistoryPage ({ onBack, matches, onSelectMatch, isLoadingMatchDetails, matchError }: Props) {
    return (
        <div className="history-page">
            <BackButton onBack={onBack}/>

            <header className="history-page__header">
                <h1>Histórico de partidas</h1>
            </header>
            
            <div className="history-page__feedback">
                {isLoadingMatchDetails && <p>Carregando detalhes da partida selecionada...</p>}
                {matchError && <p className="match-error">{matchError}</p>}
            </div>
            
            <section className="match-list">
                {matches.length > 0 ?  (
                    matches.map((match) => (
                        <MatchCard
                            key={match.matchId}
                            match={match}
                            onSelectMatch={onSelectMatch}
                            isLoadingMatchDetails={isLoadingMatchDetails}
                        />
                    ))
                ) : (
                    <p className="empty-state">Nenhuma partida encontrada</p>
                )}
            </section>
        </div>
    )
}

export default HistoryPage;