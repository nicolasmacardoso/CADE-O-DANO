import type { CSSProperties } from "react";
import type { Participant } from "../../../types/matchDetail";
import ParticipantItems from "./ParticipantItems";

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
        isSearchedPlayer,
        itemIconUrls
    } = participant;

    const damageRatio = highestTeamDamage > 0
        ? totalDamage / highestTeamDamage
        : 0;

    const kda = `${kills}/${deaths}/${assists}`;
    
    const damageStyle = { "--damage-ratio": damageRatio } as CSSProperties;

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
            
            <div className="participant-card__items-summary">
                <ParticipantItems itemIconUrls={itemIconUrls}/>
            </div>

            <p className="participant-card__kda">{kda}</p>

            <div 
                className="participant-card__damage"
                data-damage={`Dano total: ${totalDamage}`}
                style={damageStyle}
            >
                <p className="damage">{totalDamage}</p>
            </div>
        </div>
    );
}

export default MatchParticipantsCard;
