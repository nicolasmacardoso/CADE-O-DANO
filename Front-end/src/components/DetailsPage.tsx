import type { MatchDetail } from "../types/matchDetail";

import BackButton from "./BackButton";
import MatchDetailsPage from "./MatchDetailsPage";

type Props = {
    onBack: () => void;
    matchDetails: MatchDetail | null;
}

function DetailsPage ({ onBack, matchDetails }: Props) {
    return (
        <div>
            <BackButton onBack={onBack}/>

            {matchDetails ? (
                <MatchDetailsPage
                    matchDetails={matchDetails}
                />
            ) : (
                <p>Partida não carregada</p>
            )}
        </div>
    )
}

export default DetailsPage;