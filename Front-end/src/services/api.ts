import { api_base_URL } from "./api_url";

const BASE_URL = api_base_URL;

export const buscarHistorico = async (nick: string, tag: string, count: string) => {
  const res = await fetch(`${BASE_URL}search/${nick}/${tag}?count=${count}`);
  return res.json();
};

export const buscarMatch = async (matchId: string, puuid: string) => {
  const res = await fetch(`${BASE_URL}match/${matchId}?puuid=${puuid}`);
  return res.json();
};
