import type { MatchSummary } from "../../../types/match"

type Props =  {
    match: MatchSummary;
    onSelectMatch: (matchId: string) => Promise<void>;
    isLoadingMatchDetails: boolean;
}

function MatchCard ({match, onSelectMatch, isLoadingMatchDetails}: Props) {
    const { 
        matchId, 
        championName, 
        championIconUrl, 
        kills, 
        deaths, 
        assists, 
        totalDamage, 
        win, 
        gameStartTimestamp,
        champLevel
    } = match;

    return (
        <button 
            type="button"
            className="match-card" 
            disabled={isLoadingMatchDetails}
            onClick={() => onSelectMatch(matchId)}
        >
            <div className="match-card__champion">
                <div className="champ-icon">
                    <img className="champion-img" src={championIconUrl} alt={championName} />
                    <p className="champion-level">{champLevel}</p>
                </div>
                
                <p className="champion-name">{championName}</p>
            </div>

            <div className="match-card__result">
                <strong className={win ? "match-result match-result--win" : "match-result match-result--loss"}>
                    {win ? "Vitória" : "Derrota"}
                </strong>
                <span>Ranqueada</span>
            </div>
            
            <div className="match-card__meta">
                <strong>Summoner's Rift</strong>
                <span>{gameStartTimestamp}</span>
            </div>
            
            <div className="match-card__stats">
                <p className="match-kda">kda: {kills}/{deaths}/{assists}</p>
                <p className="match-card-damage">dano: {totalDamage}</p>
            </div>
        </button>
    );
}

export default MatchCard;