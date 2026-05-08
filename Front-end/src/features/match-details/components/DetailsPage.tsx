import type { MatchDetail } from "../../../types/matchDetail";

import BackButton from "../../../shared/components/BackButton";
import MatchDetailsPage from "./MatchDetailsPage";

type Props = {
    onBack: () => void;
    matchDetails: MatchDetail | null;
}

function DetailsPage ({ onBack, matchDetails }: Props) {
    return (
        <div className="details-page">
            <BackButton onBack={onBack}/>

            {matchDetails ? (
                <MatchDetailsPage
                    matchDetails={matchDetails}
                />
            ) : (
                <p className="empty-state">Partida não carregada</p>
            )}
        </div>
    )
}

export default DetailsPage;