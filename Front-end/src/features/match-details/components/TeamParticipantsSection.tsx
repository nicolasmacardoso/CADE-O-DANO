import type { Participant } from "../../../types/matchDetail";
import MatchParticipantsCard from "./MatchParticipantsCard";

type Props = {
    title: "Equipe 1" | "Equipe 2";
    variant: "blue" | "red";
    participants: Participant[];
}

function TeamParticipantsSection ({ title, participants, variant }: Props) {
    function renderParticipants () {
        const highestTeamDamage = Math.max(
            ...participants.map((participant) => participant.totalDamage),
            0
        );
        
        return participants.map((participant) => (
            <MatchParticipantsCard
                key={participant.summonerName+participant.championName}
                participant={participant}
                highestTeamDamage={highestTeamDamage}
            />
        ))
    }

    return (
        <section className={"team-section team-section--"+variant}>
            <header className="team-section__header">
                <h2>{title}</h2>
            </header>

            <div className="participant-list">
                {renderParticipants()}
            </div>
        </section>
    );
}

export default TeamParticipantsSection;