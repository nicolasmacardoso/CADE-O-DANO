import type { HighestDamageChampion, MostPlayedChampion, SummonerElo } from "../../services/api/types";
import RemoteImage from "./RemoteImage";

type Props = {
    summonerName: string;
    summonerLevel: string | number;
    profileIconUrl: string;
    mostPlayedChampions: MostPlayedChampion[];
    highestDamageChampions: HighestDamageChampion[];
    summonerElos: SummonerElo[];
}

function formatQueueType(queueType: string) {
    if (queueType === "RANKED_SOLO_5x5") return "Solo/Duo";
    if (queueType === "RANKED_FLEX_SR") return "Flex";

    return queueType;
}

function PlayerSidebar ({ summonerName, summonerLevel, profileIconUrl, mostPlayedChampions, highestDamageChampions, summonerElos }: Props) {
    return (
        <div className="player-sidebar">
            <div className="player-sidebar__header">
                <div className="player-icon">
                    <RemoteImage className="player-img" src={profileIconUrl} alt="icone de invocador"/>

                    <p className="player-level">{summonerLevel}</p>
                </div>

                <p className="player-name">{summonerName}</p>
                <p className="player-status">Online</p>
            </div>

            <div className="player-sidebar__section">
                <div className="player-sidebar__elos">
                    {summonerElos.length > 0 ? (
                        summonerElos.slice(0, 2).map(({
                            queueType,
                            leagueIconUrl,
                            tier,
                            rank,
                            leaguePoints,
                            wins,
                            losses,
                            winRate
                        }) => (
                            <div key={queueType} className="player-sidebar__elo">
                                <RemoteImage className="player-sidebar__elo-icon" src={leagueIconUrl} alt={`Elo ${tier}`} />

                                <p className="player-sidebar__elo-queue">{formatQueueType(queueType)}</p>
                                <p className="player-sidebar__elo-rank">{tier} {rank}</p>
                                <p className="player-sidebar__elo-subinfo">{leaguePoints} LP</p>
                                <p className="player-sidebar__elo-subinfo">{wins}V / {losses}D</p>
                                <p className="player-sidebar__elo-winrate">{winRate}</p>
                            </div>
                        ))
                    ) : (
                        <p className="player-sidebar__empty">Sem partidas ranqueadas</p>
                    )}
                </div>
            </div>

            <div className="player-sidebar__section">
                <p className="sidebar-section-title">Campeões mais jogados</p>
                {mostPlayedChampions.map(({ 
                    championName, 
                    championIconUrl, 
                    gamesPlayed 
                }) => (
                    <div key={championName} className="player-sidebar__champion">
                        <RemoteImage className="champion-icon" src={championIconUrl} alt="Icone do campeao"/>
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
                        <RemoteImage className="champion-icon" src={championIconUrl} alt="Icone do campeao"/>
                        <p className="champion-name">{championName}</p>
                        <p className="champion-subinfo">{highestDamage} de dano total</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlayerSidebar;
