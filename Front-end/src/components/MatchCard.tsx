import type { MatchSummary } from "../types/match"

type Props =  {
    match: MatchSummary;
    onClick: (matchId: string) => void;
}

function MatchCard ({match, onClick}: Props) {
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
        <div key={matchId} onClick={() => onClick(matchId)}>
            <p>{win ? "vitória" : "derrota"}</p>
            <img src={championIconUrl} alt={championName} />
            <p>level: {champLevel}</p>
            <p>nome champion: {championName}</p>
            <p>kda: {kills}/{deaths}/{assists}</p>
            <p>dano: {totalDamage} de dano</p>
        </div>
    );
}

export default MatchCard;