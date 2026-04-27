const BASE_URL = "http://localhost:3000";

export const buscarHistorico = async (nick: string, tag: string) => {
    const res = await fetch(`${BASE_URL}/history?nick=${nick}&tag=${tag}`);
    return res.json();
}

export const buscarMatch = async (matchId: string) => {
    const res = await fetch(`${BASE_URL}/match/${matchId}`);
    return res.json();
}