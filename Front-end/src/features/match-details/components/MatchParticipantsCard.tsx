import type { Participant } from "../../../types/matchDetail";

type Props = {
    participant: Participant;
    highestTeamDamage: number;
}

function MatchParticipantsCard ({ participant, highestTeamDamage }: Props) {
    const { 
        summonerName, 
        championSplashArtUrl,
        championName, 
        kills, 
        deaths, 
        assists, 
        totalDamage, 
        champLevel, 
        isSearchedPlayer
    } = participant;

    const damageRatio = highestTeamDamage > 0
        ? totalDamage / highestTeamDamage
        : 0;

    return (
        <div className={isSearchedPlayer ? "participant-card participant-card--selected" : "participant-card"}>
            <div className="champ-info">
                <img className="champion-img" src={championSplashArtUrl} alt={championName}/>
                <p className="champion-level">{champLevel}</p>
            </div>

            <div className="participant-card__player">
                <p className="name">{summonerName}</p>
                <p className="champion-name">{championName}</p>
            </div>
            
            <div className="participant-card__kda">
                <p className="kda">kda: {kills}/{deaths}/{assists}</p>
            </div>

            <div 
                className="participant-card__damage"
                data-damage={`Dano total: ${totalDamage}`}
                style={{ "--damage-ratio": damageRatio } as React.CSSProperties}
            />
        </div>
    )
}

export default MatchParticipantsCard;
