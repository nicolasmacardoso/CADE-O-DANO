import type { CSSProperties } from "react";
import type { MatchSummary } from "../../../types/match"
import ParticipantItems from "../../match-details/components/ParticipantItems";

const MATCH_RESULT_DISPLAY: Record<MatchSummary["result"], { label: string; classModifier: string }> = {
    0: { label: "Vitória", classModifier: "win" },
    1: { label: "Derrota", classModifier: "loss" },
    2: { label: "Remake", classModifier: "rmk" },
};

type Props =  {
    match: MatchSummary;
    maxDamageInList: number;
    minDamageInList: number;
    onSelectMatch: (matchId: string) => Promise<void>;
    isLoadingMatchDetails: boolean;
    showDamageText: boolean;
}

function MatchCard ({ match, maxDamageInList, minDamageInList, onSelectMatch, isLoadingMatchDetails, showDamageText }: Props) {
    const { 
        matchId, 
        championName, 
        championIconUrl, 
        kills, 
        deaths, 
        assists, 
        totalDamage, 
        result, 
        gameStartTimestamp,
        champLevel,
        itemIconUrls
    } = match;

    const damageRatio = maxDamageInList > 0
        ? totalDamage / maxDamageInList
        : 0;

    const damagePercent = Math.round(damageRatio * 100);
    const hasDamageRange = maxDamageInList > minDamageInList;
    const damageIndicator = hasDamageRange && totalDamage === maxDamageInList
        ? "highest"
        : hasDamageRange && totalDamage === minDamageInList
            ? "lowest"
            : null;

    const resultadoPartida = MATCH_RESULT_DISPLAY[result];
    
    return (
        <button 
            type="button"
            className={`match-card match-card--${resultadoPartida.classModifier}`} 
            disabled={isLoadingMatchDetails}
            onClick={() => onSelectMatch(matchId)}
        >
            <div className="match-card__champion">
                <div className="champ-icon">
                    <div className="champ-icon__frame">
                        <img className="champion-img" src={championIconUrl} alt={championName} />
                    </div>

                    <p className="champion-level">{champLevel}</p>
                </div>
                
                <p className="champion-name">{championName}</p>
            </div>

            <div className="match-card__result">
                <strong className={`match-result match-result--${resultadoPartida.classModifier}`}>
                    {resultadoPartida.label}
                </strong>
                <span>Ranqueada</span>
            </div>
            
            <div className="match-card__meta">
                <strong>Summoner's Rift</strong>
                <span>{gameStartTimestamp}</span>
            </div>
            
            <div className="match-card__items-summary">
                <ParticipantItems itemIconUrls={itemIconUrls} />
            </div>

            <p className="match-kda">{kills}/{deaths}/{assists}</p>

            <div
                className="match-card__damage-summary"
                data-damage-tooltip={`Dano: ${totalDamage} | ${damagePercent}% do maior dano da lista`}
                style={{ "--history-damage-ratio": damageRatio } as CSSProperties}
            >
                {damageIndicator && (
                    <span className={`match-card__damage-indicator match-card__damage-indicator--${damageIndicator}`}>
                        {damageIndicator === "highest" ? "Maior dano" : "Menor dano"}
                    </span>
                )}

                <div className="match-card__damage-bar">
                    {showDamageText && <p className="match-card-damage">{totalDamage}</p>}
                </div>
            </div>
        </button>
    );
}

export default MatchCard;
