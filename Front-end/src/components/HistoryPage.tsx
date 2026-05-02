import type { MatchSummary } from "../types/match";
import BackButton from "./BackButton";
import MatchCard from "./MatchCard";

type Props = {
    onBack: () => void;
    matches: MatchSummary[];
    onSelectMatch: (matchId: string) => Promise<void>;
}

function HistoryPage ({ onBack, matches, onSelectMatch }: Props) {
    return (
        <div className="">
            <BackButton onBack={onBack}/>
            
            {matches.map((match) => (
                <MatchCard
                    key={match.matchId}
                    match={match}
                    onSelectMatch={onSelectMatch}
                />
            ))}
        </div>
    )
}

export default HistoryPage;