import type { MatchDetail } from "../types/matchDetail"
import MatchParticipantsCard from "./MatchParticipantsCard";

type Props = {
    matchDetails: MatchDetail;
}

function MatchDetailsPage ({matchDetails}: Props) {
    function renderizaParticipantes (team: "1" | "2") {
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
        <div>
            <p>{playerWin ? "Vitória" : "Derrota"}</p>
            <p>{queueType}</p>
            <p>{gameDuration}</p>
            <hr></hr>
            {renderizaParticipantes("1")}
            <hr></hr>
            {renderizaParticipantes("2")}
        </div>
    )
}

export default MatchDetailsPage;