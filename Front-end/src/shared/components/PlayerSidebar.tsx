import type { HighestDamageChampion, MostPlayedChampion } from "../../services/api/types";

type Props = {
    summonerName: string;
    summonerLevel: number;
    profileIconUrl: string;
    mostPlayedChampions: MostPlayedChampion[];
    highestDamageChampions: HighestDamageChampion[];
}

function PlayerSidebar ({ summonerName, summonerLevel, profileIconUrl, mostPlayedChampions, highestDamageChampions }: Props) {
    return (
        <div className="player-sidebar">
            <div className="player-sidebar__header">
                <div className="player-icon">
                    <img className="player-img" src={profileIconUrl} alt="icone de invocador"/>

                    <p className="player-level">{summonerLevel}</p>
                </div>

                <p className="player-name">{summonerName}</p>
                <p className="player-status">Online</p>
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