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
        <div onClick={() => !isLoadingMatchDetails && onSelectMatch(matchId)}>
            <p>{win ? "vitória" : "derrota"}</p>
            <p>{gameStartTimestamp}</p>
            <img src={championIconUrl} alt={championName} />
            <p>level: {champLevel}</p>
            <p>nome champion: {championName}</p>
            <p>kda: {kills}/{deaths}/{assists}</p>
            <p>dano: {totalDamage}</p>
        </div>
    );
}

export default MatchCard;