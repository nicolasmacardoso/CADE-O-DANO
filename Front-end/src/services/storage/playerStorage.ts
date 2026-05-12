import type { SearchHistoryData } from "../api/types";

const CURRENT_PLAYER_KEY = "cade-o-dano:current-player";
const CURRENT_PLAYER_HISTORY_KEY = "cade-o-dano:current-player-history";
const SEARCHED_PLAYERS_KEY = "cade-o-dano:searched-players";

export type StoredPlayer = {
    profileIconUrl: string;
    nick: string;
    tag: string;
};

export function saveCurrentPlayer(player: StoredPlayer) {
    localStorage.setItem(CURRENT_PLAYER_KEY, JSON.stringify(player))
}

export function getCurrentPlayer(): StoredPlayer | null {
    const storedPlayer = localStorage.getItem(CURRENT_PLAYER_KEY);
    
    if (!storedPlayer) return null;
    
    try {
        return JSON.parse(storedPlayer) as StoredPlayer;
    } catch {
        localStorage.removeItem(CURRENT_PLAYER_KEY);
        return null;
    }
}

export function clearCurrentPlayer() {
    localStorage.removeItem(CURRENT_PLAYER_KEY);
    localStorage.removeItem(CURRENT_PLAYER_HISTORY_KEY);
}

export function saveCurrentPlayerHistory(history: SearchHistoryData) {
    localStorage.setItem(CURRENT_PLAYER_HISTORY_KEY, JSON.stringify(history));
}

export function getCurrentPlayerHistory(): SearchHistoryData | null {
    const storedHistory = localStorage.getItem(CURRENT_PLAYER_HISTORY_KEY);

    if (!storedHistory) return null;

    try {
        return JSON.parse(storedHistory) as SearchHistoryData;
    } catch {
        localStorage.removeItem(CURRENT_PLAYER_HISTORY_KEY);
        return null;
    }
}

export function saveSearchedPlayer(player: StoredPlayer) {
    const storedPlayers = getSearchedPlayers();

    const filteredPlayers = storedPlayers.filter(
        (storedPlayer) => 
            storedPlayer.nick !== player.nick || storedPlayer.tag !== player.tag
    );

    const updatedPlayers = [player, ...filteredPlayers];

    localStorage.setItem(SEARCHED_PLAYERS_KEY, JSON.stringify(updatedPlayers));
}

export function getSearchedPlayers(): StoredPlayer[] {
    const storedPlayers = localStorage.getItem(SEARCHED_PLAYERS_KEY);

    if (!storedPlayers) return [];

    try {
        return JSON.parse(storedPlayers) as StoredPlayer[];
    } catch {
        localStorage.removeItem(SEARCHED_PLAYERS_KEY);
        return [];
    }
}
