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

    const teams = matchDetails.teams
        .toSorted((firstTeam, secondTeam) => firstTeam.teamId - secondTeam.teamId)
        .map((team, index) => ({
            title: `Equipe ${index + 1}`,
            participants: team.participants,
            variant: index === 0 ? "blue" : "red",
        })) as {
            title: string;
            participants: MatchDetail["teams"][number]["participants"];
            variant: "blue" | "red";
        }[];

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
