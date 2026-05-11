import type { MatchDetail } from "../../../types/matchDetail"
import BackButton from "../../../shared/components/BackButton";
import TeamParticipantsSection from "./TeamParticipantsSection";

type Props = {
    matchDetails: MatchDetail;
    onBack: () => void;
}

function MatchDetailsPage ({ matchDetails, onBack }: Props) {
    const { 
        playerWin, 
        queueType, 
        gameDuration 
    } = matchDetails; 

    const teams = [
        {
            title: "Equipe 1",
            participants: matchDetails.team1,
            variant: "blue"
        },
        {
            title: "Equipe 2",
            participants: matchDetails.team2,
            variant: "red"
        }
    ] as const;

    return (
        <div className="match-details-page">
            <header className="match-details-page__header">
                <BackButton onBack={onBack}/>

                <div className="match-details-page__summary">
                    <strong className={playerWin ? "match-result match-result--win" : "match-result match-result--loss"}>
                        {playerWin ? "Vitória" : "Derrota"}
                    </strong>
                    
                    <span>{queueType}</span>
                    <span>{gameDuration}</span>
                </div>
            </header>

            {teams.map(({ 
                title, 
                participants, 
                variant 
            }) => (
                <TeamParticipantsSection
                    key={title}
                    title={title}
                    participants={participants}
                    variant={variant}
                />
            ))}
        </div>
    )
}

export default MatchDetailsPage;