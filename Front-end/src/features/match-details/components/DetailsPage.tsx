import type { MatchDetail } from "../../../types/matchDetail";

import MatchDetailsPage from "./MatchDetailsPage";

type Props = {
    onBack: () => void;
    matchDetails: MatchDetail | null;
}

function DetailsPage ({ onBack, matchDetails }: Props) {
    return (
        <div className="details-page">
            {matchDetails ? (
                <MatchDetailsPage
                    matchDetails={matchDetails}
                    onBack={onBack}
                />
            ) : (
                <p className="empty-state">Partida não carregada</p>
            )}
        </div>
    )
}

export default DetailsPage;