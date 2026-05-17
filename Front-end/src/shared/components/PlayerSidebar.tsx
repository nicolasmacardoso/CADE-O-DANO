import type { SummonerElo } from "../../services/api/types";
import RemoteImage from "./RemoteImage";
import BronzeImage from "../../assets/ranks/bronze.png";
import ChallengerImage from "../../assets/ranks/challenger.png";
import DiamondImage from "../../assets/ranks/diamond.png";
import EmeraldImage from "../../assets/ranks/emerald.png";
import GoldImage from "../../assets/ranks/gold.png";
import GrandmasterImage from "../../assets/ranks/grandmaster.png";
import IronImage from "../../assets/ranks/iron.png";
import PlatinumImage from "../../assets/ranks/platinum.png";
import SilverImage from "../../assets/ranks/silver.png";

type Props = {
    summonerName: string;
    summonerLevel: string | number;
    profileIconUrl: string;
    summonerElos: SummonerElo[];
}

const rankIconByTier: Record<string, string> = {
    iron: IronImage,
    ferro: IronImage,
    bronze: BronzeImage,
    silver: SilverImage,
    prata: SilverImage,
    gold: GoldImage,
    ouro: GoldImage,
    platinum: PlatinumImage,
    platina: PlatinumImage,
    emerald: EmeraldImage,
    esmeralda: EmeraldImage,
    diamond: DiamondImage,
    diamante: DiamondImage,
    grandmaster: GrandmasterImage,
    graomestre: GrandmasterImage,
    challenger: ChallengerImage,
    desafiante: ChallengerImage,
};

function normalizeTier(tier: string) {
    return tier
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase();
}

function getRankIcon(tier: string) {
    return rankIconByTier[normalizeTier(tier)];
}

function formatQueueType(queueType: string) {
    if (queueType === "RANKED_SOLO_5x5") return "Ranqueada Solo/Duo";
    if (queueType === "RANKED_FLEX_SR") return "Ranqueada Flex";

    return queueType;
}

function PlayerSidebar ({ summonerName, summonerLevel, profileIconUrl, summonerElos }: Props) {
    return (
        <div className="player-sidebar">
            <div className="player-sidebar__header">
                <div className="player-icon">
                    <RemoteImage className="player-img" src={profileIconUrl} alt="Ícone de invocador"/>

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
                            tier,
                            rank,
                            leaguePoints,
                            wins,
                            losses,
                            winRate
                        }) => {
                            const rankIcon = getRankIcon(tier);

                            return (
                                <div key={queueType} className="player-sidebar__elo">
                                    {rankIcon ? (
                                        <RemoteImage className="player-sidebar__elo-icon" src={rankIcon} alt={`Elo ${tier}`} />
                                    ) : (
                                        <div className="player-sidebar__elo-icon player-sidebar__elo-icon--fallback" aria-hidden="true">
                                            {tier.slice(0, 3).toUpperCase()}
                                        </div>
                                    )}

                                    <p className="player-sidebar__elo-queue">{formatQueueType(queueType)}</p>
                                    <p className="player-sidebar__elo-rank">{tier} {rank}</p>
                                    <p className="player-sidebar__elo-subinfo">{leaguePoints} LP</p>
                                    <p className="player-sidebar__elo-subinfo">{wins}V / {losses}D</p>
                                    <p className="player-sidebar__elo-winrate">{winRate}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p className="player-sidebar__empty">Sem partidas ranqueadas</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlayerSidebar;
