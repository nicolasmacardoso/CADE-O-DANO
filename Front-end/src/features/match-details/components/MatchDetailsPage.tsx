import type { MatchDetail } from "../../../types/matchDetail"
import BackButton from "../../../shared/components/BackButton";
import TeamParticipantsSection from "./TeamParticipantsSection";
import { useState } from "react";

type Props = {
    matchDetails: MatchDetail;
    onBack: () => void;
    handleSearchParticipant: (nick: string, tag: string) => void;
}

type MatchTeam = MatchDetail["teams"][number];

type DisplayTeam = {
    title: string;
    variant: "blue" | "red";
    participants: MatchTeam["participants"];
    totalTeamKills: MatchTeam["totalTeamKills"];
    totalTeamDeaths: MatchTeam["totalTeamDeaths"];
    totalTeamAssists: MatchTeam["totalTeamAssists"];
}

function MatchDetailsPage ({ matchDetails, onBack, handleSearchParticipant }: Props) {
    const [showDamageText, setShowDamageText] = useState(false);

    const { 
        playerWin, 
        queueType, 
        gameDuration 
    } = matchDetails; 

    const selectedTeamIndex = matchDetails.teams.findIndex((team) =>
        team.participants.some((participant) => participant.isSearchedPlayer)
    );
    
    const teams: DisplayTeam[] = matchDetails.teams
        .map((team, index) => ({
            team,
            originalIndex: index,
        }))
        .sort((first, second) => {
            const firstIsSelected = first.originalIndex === selectedTeamIndex;
            const secondIsSelected = second.originalIndex === selectedTeamIndex;

            if (firstIsSelected && !secondIsSelected) return -1;
            if (!firstIsSelected && secondIsSelected) return 1;

            return first.team.teamId - second.team.teamId;
        })
        .map(({ team }, index) => {
            const {
                participants,
                teamId,
                totalTeamKills,
                totalTeamDeaths,
                totalTeamAssists,
            } = team;

            return {
                title: `Equipe ${index + 1}`,
                participants,
                variant: teamId === 100 ? "blue" : "red",
                totalTeamKills,
                totalTeamDeaths,
                totalTeamAssists,
            };
        });

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
                variant,
                totalTeamKills,
                totalTeamDeaths,
                totalTeamAssists,
            }) => (
                <TeamParticipantsSection
                    key={title}
                    title={title}
                    participants={participants}
                    handleSearchParticipant={handleSearchParticipant}
                    totalTeamKills={totalTeamKills}
                    totalTeamDeaths={totalTeamDeaths}
                    totalTeamAssists={totalTeamAssists}
                    variant={variant}
                    showDamageText={showDamageText}
                />
            ))}
        </div>
    )
}

export default MatchDetailsPage;
