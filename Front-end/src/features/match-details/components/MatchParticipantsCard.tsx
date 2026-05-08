import type { Participant } from "../../../types/matchDetail";

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
        <div className={isSearchedPlayer ? "participant-card participant-card--selected" : "participant-card"}>
            <div className="champ-info">
                <img className="champion-img" src={championIconUrl} alt={championName}/>
                <p className="champion-level">{champLevel}</p>
            </div>

            <p className="champion-name">{championName}</p>

            <div className="participant-card__player">
                <p className="name">Jogador: {summonerName}</p>
            </div>

            <div className="participant-card__damage">
                <p className="damage">Dano total: {totalDamage}</p>
            </div>
            
            <div className="participant-card__kda">
                <p className="kda">kda: {kills}/{deaths}/{assists}</p>
            </div>
        </div>
    )
}

export default MatchParticipantsCard;