import type { MatchSummary } from "../../../types/match";
import BackButton from "../../../shared/components/BackButton";
import MatchCard from "./MatchCard";

type Props = {
    onBack: () => void;
    matches: MatchSummary[];
    onSelectMatch: (matchId: string) => Promise<void>;
    isLoadingMatchDetails: boolean;
}

function HistoryPage ({ onBack, matches, onSelectMatch, isLoadingMatchDetails }: Props) {
    return (
        <div className="">
            {isLoadingMatchDetails && <p>Carregando detalhes da partida selecionada...</p>}

            <BackButton onBack={onBack}/>
            
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
                <p>Nenhuma partida encontrada</p>
            )}
        </div>
    )
}

export default HistoryPage;