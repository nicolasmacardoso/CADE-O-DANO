const BASE_URL = "http://localhost:5189/search";

export const buscarHistorico = async (nick: string, tag: string) => {
    const res = await fetch(`${BASE_URL}/${nick}/${tag}?count=5`);
    return res.json();
}

export const buscarMatch = async (matchId: string) => {
    const res = await fetch(`${BASE_URL}/match/${matchId}`);
    return res.json();
}