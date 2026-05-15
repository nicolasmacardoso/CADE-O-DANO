import type { CSSProperties } from "react";
import type { Participant } from "../../../types/matchDetail";
import type { summonerElo } from "../../../services/api/types";
import ParticipantItems from "./ParticipantItems";
import runesIcon from "../../../assets/runesicon.png";
import minionIcon from "../../../assets/icon_minions.png";
import RemoteImage from "../../../shared/components/RemoteImage";

type Props = {
    participant: Participant;
    highestTeamDamage: number;
    showDamageText: boolean;
    handleOpenRunes: () => void;
    handleSearchParticipant: (nick: string, tag: string) => void;
}

function formatEloBadge(elo: summonerElo) {
    const tierLabel = elo.tier.slice(0, 3).toUpperCase();

    if (!elo.rank) return tierLabel;

    return `${tierLabel} ${elo.rank}`;
}

function MatchParticipantsCard ({ participant, highestTeamDamage, showDamageText, handleOpenRunes, handleSearchParticipant }: Props) {
    const { 
        summonerName, 
        summonerHashtag, 
        championSplashArtUrl,
        championName, 
        kills, 
        deaths, 
        assists, 
        killParticipation,
        cs,
        csPerMinute,
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
    const playerName = summonerName ?? "";
    const playerTag = summonerHashtag ?? "";
    const displayPlayerName = playerName && playerTag
        ? `${playerName}#${playerTag}`
        : "Jogador desconhecido";
    const championLabel = championName ?? "Campeão desconhecido";
    const championSplashArt = championSplashArtUrl ?? "";
    const canSearchParticipant = playerName.length > 0 && playerTag.length > 0;
    
    const damageStyle = { "--damage-ratio": damageRatio } as CSSProperties;

    return (
        <div 
            className={isSearchedPlayer ? "participant-card participant-card--selected" : "participant-card"} 
        >
            <div className="champ-info">
                <RemoteImage className="champion-img" src={championSplashArt} alt={championLabel}/>
                <p className="champion-level">{champLevel}</p>
            </div>

            <div className="participant-card__player">
                <div className="participant-card__player-header">
                    <button
                        className="participant-card__player-name"
                        type="button"
                        onClick={() => handleSearchParticipant(playerName, playerTag)}
                        disabled={!canSearchParticipant}
                    >
                        <span className="name">{displayPlayerName}</span>
                    </button>

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
                
                <p className="champion-name">{championLabel}</p>
            </div>

            <button 
                className="participant-card__runes-summary"
                onClick={handleOpenRunes}
            >
                <img src={runesIcon} alt="Icone de runa padrao"/>
            </button>

            <div className="participant-card__items-summary">
                <ParticipantItems itemIconUrls={itemIconUrls}/>
            </div>

            <div className="participant-card__kda">
                <p>
                    <span>{kda}</span> <span>{killParticipation} K/P</span>
                </p> 
                <p>
                    <span>
                        {cs}
                        <span className="participant-card__minion-icon" aria-hidden="true">
                            <img src={minionIcon} alt="" />
                        </span>
                    </span> 
                    <span>{csPerMinute} cs/m</span>
                </p> 
            </div>

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
