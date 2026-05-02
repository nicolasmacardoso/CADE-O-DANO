import type { Participant } from "../types/matchDetail";

type Props = {
    participant: Participant
}

function MatchParticipantsCard ({participant}: Props) {
    const { 
        summonerName, 
        championIconUrl, 
        championName, 
        kills, 
        deaths, 
        assists, 
        totalDamage, 
        champLevel, 
        isSearchedPlayer
    } = participant;
    return (
        <div>
            <div className={isSearchedPlayer ? "border border-blue-500" : ""}>
                <img src={championIconUrl} alt="" />
                <p>{championName}</p>
                <p>{champLevel}</p>
            </div>

            <div>
                <p>Jogador: {summonerName}</p>
            </div>

            <div>
                <p>Dano total: {totalDamage}</p>
            </div>
            
            <div>
                <p>kda: {kills}/{deaths}/{assists}</p>
            </div>
        </div>
    )
}

export default MatchParticipantsCard;