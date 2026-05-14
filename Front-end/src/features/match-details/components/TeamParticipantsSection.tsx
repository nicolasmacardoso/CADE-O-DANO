import { Fragment, useEffect, useRef, useState } from "react";
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
    const [closingRunesKey, setClosingRunesKey] = useState<string | null>(null);
    const closeAnimationTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (closeAnimationTimeoutRef.current) {
                window.clearTimeout(closeAnimationTimeoutRef.current);
            }
        };
    }, []);

    function handleToggleRunes(participantKey: string) {
        if (closeAnimationTimeoutRef.current) {
            window.clearTimeout(closeAnimationTimeoutRef.current);
            closeAnimationTimeoutRef.current = null;
        }

        if (openedRunesKey === participantKey) {
            setOpenedRunesKey(null);
            setClosingRunesKey(participantKey);

            closeAnimationTimeoutRef.current = window.setTimeout(() => {
                setClosingRunesKey(null);
                closeAnimationTimeoutRef.current = null;
            }, 360);

            return;
        }

        setClosingRunesKey(null);
        setOpenedRunesKey(participantKey);
    }

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
                    const isRunesClosing = closingRunesKey === participantKey;
                    const shouldRenderRunes = isRunesOpen || isRunesClosing;

                    return (
                        <Fragment key={participantKey}>
                            <MatchParticipantsCard
                                onClickRunes={() => handleToggleRunes(participantKey)}
                                participant={participant}
                                highestTeamDamage={highestTeamDamage}
                                showDamageText={showDamageText}
                            />
                            {shouldRenderRunes && (
                                <div className={isRunesClosing ? "participant-runes-shell participant-runes-shell--closing" : "participant-runes-shell participant-runes-shell--open"}>
                                    <MatchParticipantsRunes
                                        runes={participant.runes}
                                    />
                                </div>
                            )}
                        </Fragment>
                    );
                })}
            </div>
        </section>
    );
}

export default TeamParticipantsSection;
