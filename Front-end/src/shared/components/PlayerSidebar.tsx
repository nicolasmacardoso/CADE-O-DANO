import type { HighestDamageChampion, MostPlayedChampion } from "../../services/api/types";

type Props = {
    summonerName: string;
    mostPlayedChampions: MostPlayedChampion[];
    highestDamageChampions: HighestDamageChampion[];
}

function PlayerSidebar ({ summonerName, mostPlayedChampions, highestDamageChampions }: Props) {
    return (
        <div className="player-sidebar">
            <div className="player-sidebar__header">
                {/* <img className="player-icon" src={summonerIconURL} alt="icone de invocador"/> */}
                <p className="player-name">{summonerName}</p>
            </div>

            <div className="player-sidebar__section">
                <p className="sidebar-section-title">Campeões mais jogados</p>
                {mostPlayedChampions.map(({ 
                    championName, 
                    championIconUrl, 
                    gamesPlayed 
                }) => (
                    <div key={championName} className="player-sidebar__champion">
                        <img className="champion-icon" src={championIconUrl} alt="Icone do campeao"/>
                        <p className="champion-name">{championName}</p>
                        <p className="champion-subinfo">{gamesPlayed} partidas</p>
                    </div>
                ))}
            </div>

            <div className="player-sidebar__section">
                <p className="sidebar-section-title">Maior dano por campeão</p>
                {highestDamageChampions.map(({ 
                    championName, 
                    championIconUrl, 
                    highestDamage 
                }) => (
                    <div key={championName} className="player-sidebar__champion">
                        <img className="champion-icon" src={championIconUrl} alt="Icone do campeao"/>
                        <p className="champion-name">{championName}</p>
                        <p className="champion-subinfo">{highestDamage} de dano total</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlayerSidebar;