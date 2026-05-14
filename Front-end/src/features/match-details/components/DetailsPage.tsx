import type { MatchDetail } from "../../../types/matchDetail";

import MatchDetailsPage from "./MatchDetailsPage";

type Props = {
    onBack: () => void;
    matchDetails: MatchDetail | null;
    handleSearchHistory: (nick: string, tag: string) => void;
}

function DetailsPage ({ onBack, matchDetails, handleSearchHistory }: Props) {
    return (
        <div className="details-page">
            {matchDetails ? (
                <MatchDetailsPage
                    matchDetails={matchDetails}
                    handleSearchHistory={handleSearchHistory}
                    onBack={onBack}
                />
            ) : (
                <p className="empty-state">Partida não carregada</p>
            )}
        </div>
    )
}

export default DetailsPage;