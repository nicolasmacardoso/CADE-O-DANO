import type { MatchDetail } from "../../../types/matchDetail";

import MatchDetailsPage from "./MatchDetailsPage";

type Props = {
    onBack: () => void;
    matchDetails: MatchDetail | null;
    handleSearchParticipant: (nick: string, tag: string) => void;
    isSearchingParticipant: boolean;
    searchError: string;
}

function DetailsPage ({ onBack, matchDetails, handleSearchParticipant, isSearchingParticipant, searchError }: Props) {
    return (
        <div className="details-page">
            {isSearchingParticipant || searchError || (
                <div className="history-page__feedback">
                    {isSearchingParticipant && <p>Pesquisando jogador...</p>}
                    {searchError && <p className="search-error">{searchError}</p>}
                </div>
            )}

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