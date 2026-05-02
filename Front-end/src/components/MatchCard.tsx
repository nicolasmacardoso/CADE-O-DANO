import type { MatchSummary } from "../types/match"

type Props =  {
    match: MatchSummary;
    onSelectMatch: (matchId: string) => Promise<void>;
}

function MatchCard ({match, onSelectMatch}: Props) {
    const { 
        matchId, 
        championName, 
        championIconUrl, 
        kills, 
        deaths, 
        assists, 
        totalDamage, 
        win, 
        champLevel 
    } = match;

    return (
        <div onClick={() => onSelectMatch(matchId)}>
            <p>{win ? "vitória" : "derrota"}</p>
            <img src={championIconUrl} alt={championName} />
            <p>level: {champLevel}</p>
            <p>nome champion: {championName}</p>
            <p>kda: {kills}/{deaths}/{assists}</p>
            <p>dano: {totalDamage}</p>
        </div>
    );
}

export default MatchCard;