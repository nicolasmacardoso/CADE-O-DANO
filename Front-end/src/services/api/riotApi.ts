import type { SearchHistoryResponse, SearchMatchResponse } from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const buscarHistorico = async (nick: string, tag: string, count: string): Promise<SearchHistoryResponse> => {
  const res = await fetch(`${BASE_URL}search/${nick}/${tag}?count=${count}`);

  if (!res.ok) 
    throw new Error("Erro ao buscar histórico: " + res.status);

  return res.json();
};

export const buscarMatch = async (matchId: string, puuid: string): Promise<SearchMatchResponse> => {
  const res = await fetch(`${BASE_URL}match/${matchId}?puuid=${puuid}`);
  
  if (!res.ok) 
    throw new Error("Erro ao buscar partida: " + res.status);

  return res.json();
};
