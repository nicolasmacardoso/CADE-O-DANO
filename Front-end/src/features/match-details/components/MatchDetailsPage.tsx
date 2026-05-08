import type { MatchDetail } from "../../../types/matchDetail"
import MatchParticipantsCard from "./MatchParticipantsCard";

type Props = {
    matchDetails: MatchDetail;
}

function MatchDetailsPage ({matchDetails}: Props) {
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
        <div className="matchDetails-page">
            <section className="match-details game-info">
                <p className={playerWin ? "match-result match-result--win" : "match-result match-result--loss"}>
                    {playerWin ? "Vitória" : "Derrota"}
                </p>
                
                <p className="queue-type">{queueType}</p>
                
                <p className="game-duration">{gameDuration}</p>
            </section>

            <section className="team-section">
                {renderParticipants("1")}
            </section>

            <section className="team-section">
                {renderParticipants("2")}
            </section>
        </div>
    )
}

export default MatchDetailsPage;