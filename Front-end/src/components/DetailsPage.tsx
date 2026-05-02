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

            <MatchDetailsPage
                matchDetails={matchDetails}
            />
        </div>
    )
}

export default DetailsPage;