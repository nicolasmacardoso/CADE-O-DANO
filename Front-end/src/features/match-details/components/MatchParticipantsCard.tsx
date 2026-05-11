import type { CSSProperties } from "react";
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
        isSearchedPlayer,
        itemIconUrls
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
            
            <div className="participant-card__items-kda">
                <div className="participant-card__items">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div className="participant-card__item-slot" key={index}>
                            {itemIconUrls[index] ? (
                                <img
                                    className="participant-card__item-icon"
                                    src={itemIconUrls[index]}
                                    alt="Icone do item"
                                />
                            ) : (
                                <div className="participant-card__empty-item" />
                            )}
                        </div>
                    ))}
                </div>
                <p className="kda">kda: {kills}/{deaths}/{assists}</p>
            </div>

            <div 
                className="participant-card__damage"
                data-damage={`Dano total: ${totalDamage}`}
                style={{ "--damage-ratio": damageRatio } as CSSProperties}
            />
        </div>
    )
}

export default MatchParticipantsCard;
