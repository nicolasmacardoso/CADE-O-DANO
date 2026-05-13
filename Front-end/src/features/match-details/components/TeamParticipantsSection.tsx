import { Fragment, useState } from "react";
import type { Participant } from "../../../types/matchDetail";
import MatchParticipantsCard from "./MatchParticipantsCard";
import MatchParticipantsRunes from "./MatchParticipantsRunes";

type Props = {
    title: string;
    variant: "blue" | "red";
    participants: Participant[];
    showDamageText: boolean;
}

function TeamParticipantsSection ({ title, participants, variant, showDamageText }: Props) {
    const [openedRunesKey, setOpenedRunesKey] = useState<string | null>(null);

    const highestTeamDamage = Math.max(
        ...participants.map((participant) => participant.totalDamage),
        0
    );

    return (
        <section className={`team-section team-section--${variant}`}>
            <header className="team-section__header">
                <h2>{title}</h2>
            </header>

            <div className="team-section__participant-list">
                {participants.map((participant) => {
                    const participantKey = participant.summonerName + participant.championName;
                    const isRunesOpen = openedRunesKey === participantKey;

                    return (
                        <Fragment key={participantKey}>
                            <MatchParticipantsCard
                                onClickRunes={() => setOpenedRunesKey(isRunesOpen ? null : participantKey)}
                                participant={participant}
                                highestTeamDamage={highestTeamDamage}
                                showDamageText={showDamageText}
                            />
                            {isRunesOpen && (
                                <MatchParticipantsRunes
                                    runes={participant.runes}
                                />
                            )}
                        </Fragment>
                    );
                })}
            </div>
        </section>
    );
}

export default TeamParticipantsSection;
