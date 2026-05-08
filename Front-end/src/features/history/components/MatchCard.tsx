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
            <div className="match-card game-info">
                <p className={win ? "match-result match-result--win" : "match-result match-result--loss"}>
                    {win ? "Vitória" : "Derrota"}
                </p>
                
                <p className="match-timestamp">{gameStartTimestamp}</p>
            </div>
            
            <div className="champ-info">
                <div className="champ-icon">
                    <img className="champion-img" src={championIconUrl} alt={championName} />
                    <p className="champion-level">level: {champLevel}</p>
                </div>
                
                <p className="champion-name">{championName}</p>
            </div>
            
            <p className="match-kda">kda: {kills}/{deaths}/{assists}</p>
            <p className="match-card-damage">dano: {totalDamage}</p>
        </button>
    );
}

export default MatchCard;