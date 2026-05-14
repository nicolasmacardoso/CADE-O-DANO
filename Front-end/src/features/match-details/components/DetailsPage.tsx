import type { MatchDetail } from "../../../types/matchDetail";

import FloatingAlert from "../../../shared/components/FloatingAlert";
import MatchDetailsPage from "./MatchDetailsPage";

type Props = {
    onBack: () => void;
    matchDetails: MatchDetail | null;
    handleSearchParticipant: (nick: string, tag: string) => void;
    isSearchingParticipant: boolean;
    searchError: string;
}

function DetailsPage ({ onBack, matchDetails, handleSearchParticipant, isSearchingParticipant, searchError }: Props) {
    const feedbackMessage = searchError
        || (isSearchingParticipant ? "Buscando histórico do participante..." : "");

    return (
        <div className="details-page">
            <FloatingAlert
                variant={searchError ? "error" : "loading"}
                message={feedbackMessage}
            />

            {matchDetails ? (
                <MatchDetailsPage
                    matchDetails={matchDetails}
                    handleSearchParticipant={handleSearchParticipant}
                    onBack={onBack}
                />
            ) : (
                <p className="empty-state">Partida não carregada</p>
            )}
        </div>
    )
}

export default DetailsPage;
