import type { MatchDetail } from "../../../types/matchDetail"
import MatchParticipantsCard from "./MatchParticipantsCard";
import BackButton from "../../../shared/components/BackButton";

type Props = {
    matchDetails: MatchDetail;
    onBack: () => void;
}

function MatchDetailsPage ({ matchDetails, onBack }: Props) {
    function renderParticipants (team: "1" | "2") {
        const thisTeam = `team${team}` as const;
        const participants = matchDetails[thisTeam];

        return participants.map((participant) => (
            <MatchParticipantsCard
                key={participant.summonerName+participant.championName}
                participant={participant}
            />
        ))
    }

    const { 
        playerWin, 
        queueType, 
        gameDuration 
    } = matchDetails; 

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

            <section className="team-section team-section--blue">
                <header className="team-section__header">
                    <h2>Equipe 1</h2>
                </header>

                <div className="participant-list">
                    {renderParticipants("1")}
                </div>
            </section>

            <section className="team-section team-section--red">
                <header className="team-section__header">
                    <h2>Equipe 2</h2>
                </header>

                <div className="participant-list">
                    {renderParticipants("2")}
                </div>
            </section>
        </div>
    )
}

export default MatchDetailsPage;