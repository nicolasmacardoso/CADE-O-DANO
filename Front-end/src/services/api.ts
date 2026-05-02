const BASE_URL = "http://localhost:5189/";

export const buscarHistorico = async (nick: string, tag: string) => {
    const res = await fetch(`${BASE_URL}search/${nick}/${tag}?count=5`);
    return res.json();
}

export const buscarMatch = async (matchId: string,puuid: string) => {
    const res = await fetch(`${BASE_URL}match/${matchId}?puuid=${puuid}`);
    return res.json();
}