const BASE_URL = "http://localhost:5189/";

export const buscarHistorico = async (nick: string, tag: string, count: string) => {
  const res = await fetch(`${BASE_URL}search/${nick}/${tag}?count=${count}`);
  return res.json();
};

export const buscarMatch = async (matchId: string, puuid: string) => {
  const res = await fetch(`${BASE_URL}match/${matchId}?puuid=${puuid}`);
  return res.json();
};
