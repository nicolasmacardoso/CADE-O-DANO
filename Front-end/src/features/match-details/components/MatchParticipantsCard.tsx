import type { CSSProperties } from "react";
import type { Participant } from "../../../types/matchDetail";
import type { summonerElo } from "../../../services/api/types";
import ParticipantItems from "./ParticipantItems";
import runesIcon from "../../../assets/runesicon.png";

type Props = {
    participant: Participant;
    highestTeamDamage: number;
    showDamageText: boolean;
    onClickRunes: () => void;
}

function formatEloBadge(elo: summonerElo) {
    const tierLabel = elo.tier.slice(0, 3).toUpperCase();

    if (!elo.rank) return tierLabel;

    return `${tierLabel} ${elo.rank}`;
}

function MatchParticipantsCard ({ participant, highestTeamDamage, showDamageText, onClickRunes }: Props) {
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
        itemIconUrls,
        summonerElos = [],
    } = participant;

    const damageRatio = highestTeamDamage > 0
        ? totalDamage / highestTeamDamage
        : 0;

    const kda = `${kills}/${deaths}/${assists}`;
    const displayedElo = summonerElos[0] || summonerElos[1];
    
    const damageStyle = { "--damage-ratio": damageRatio } as CSSProperties;

    return (
        <div className={isSearchedPlayer ? "participant-card participant-card--selected" : "participant-card"}>
            <div className="champ-info">
                <img className="champion-img" src={championSplashArtUrl} alt={championName}/>
                <p className="champion-level">{champLevel}</p>
            </div>

            <div className="participant-card__player">
                <div className="participant-card__player-header">
                    <p className="name">{summonerName}</p>

                    {displayedElo && (
                        <div 
                            className="participant-card__elo" 
                            tabIndex={0}
                            aria-label={`Elo ${displayedElo.tier} ${displayedElo.rank}`}
                        >
                            <span className="participant-card__elo-badge">
                                {formatEloBadge(displayedElo)}
                            </span>

                            <div className="participant-card__elo-tooltip">
                                {summonerElos.map(({
                                    queueType,
                                    tier,
                                    rank,
                                    leaguePoints,
                                    wins,
                                    losses,
                                    winRate
                                }) => (
                                    <div className="participant-card__elo-tooltip-item" key={queueType}>
                                        <p className="participant-card__elo-queue">{queueType}</p>
                                        <strong>{tier} {rank}</strong>
                                        <span>{leaguePoints} LP</span>
                                        <span>{wins}V / {losses}D</span>
                                        <span>{winRate}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <p className="champion-name">{championName}</p>
            </div>

            <button 
                className="participant-card__runes-summary"
                onClick={onClickRunes}
            >
                <img src={runesIcon} alt="Icone de runa padrao"/>
            </button>

            <div className="participant-card__items-summary">
                <ParticipantItems itemIconUrls={itemIconUrls}/>
            </div>

            <p className="participant-card__kda">{kda}</p>

            <div 
                className="participant-card__damage"
                data-damage={`Dano total: ${totalDamage}`}
                style={damageStyle}
            >
                {showDamageText && <p className="damage">{totalDamage}</p>}
            </div>
        </div>
    );
}

export default MatchParticipantsCard;
