import type { Participant } from "../../../types/matchDetail";
import MatchParticipantsCard from "./MatchParticipantsCard";

type Props = {
    title: string;
    variant: "blue" | "red";
    participants: Participant[];
    showDamageText: boolean;
}

function TeamParticipantsSection ({ title, participants, variant, showDamageText }: Props) {
    const highestTeamDamage = Math.max(
        ...participants.map((participant) => participant.totalDamage),
        0
    );

    return (
        <section className={`team-section team-section--${variant}`}>
            <header className="team-section__header">
                <h2>{title}</h2>
            </header>

            <div className="participant-list">
                {participants.map((participant) => (
                    <MatchParticipantsCard
                        key={participant.summonerName + participant.championName}
                        participant={participant}
                        highestTeamDamage={highestTeamDamage}
                        showDamageText={showDamageText}
                    />
                ))}
            </div>
        </section>
    );
}

export default TeamParticipantsSection;
