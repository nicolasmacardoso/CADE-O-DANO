import type { MatchDetail } from "../../../types/matchDetail"
import BackButton from "../../../shared/components/BackButton";
import TeamParticipantsSection from "./TeamParticipantsSection";
import { useState } from "react";

type Props = {
    matchDetails: MatchDetail;
    onBack: () => void;
    handleSearchParticipant: (nick: string, tag: string) => void;
}

function MatchDetailsPage ({ matchDetails, onBack, handleSearchParticipant }: Props) {
    const [showDamageText, setShowDamageText] = useState(false);

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

                <label className="damage-toggle">
                    <span className="damage-toggle__label">Exibir dano</span>
                    <input
                        className="damage-toggle__input"
                        type="checkbox"
                        name="show-damage-text"
                        checked={showDamageText}
                        onChange={(event) => setShowDamageText(event.target.checked)}
                    />
                    <span className="damage-toggle__control" />
                </label>
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
                    handleSearchParticipant={handleSearchParticipant}
                    variant={variant}
                    showDamageText={showDamageText}
                />
            ))}
        </div>
    )
}

export default MatchDetailsPage;
