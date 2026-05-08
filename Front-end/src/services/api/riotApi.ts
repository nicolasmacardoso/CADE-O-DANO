import type { SearchHistoryResponse, SearchMatchResponse } from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchEndpoint<TResponse>(endpoint: string, requestLabel: string): Promise<TResponse> {
  if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL não configurada");
  };

  const apiRequestUrl = `${BASE_URL}${endpoint}`;
  
  const res = await fetch(apiRequestUrl);

  if (!res.ok) 
    throw new Error(`Erro ao buscar ${requestLabel}: ${res.status}`);

  return res.json();
};

export const buscarHistorico = (
  nick: string,
  tag: string,
): Promise<SearchHistoryResponse> => {
  const historyRequestUrl = `search/${nick}/${tag}?count=100`;

  return fetchEndpoint<SearchHistoryResponse>(historyRequestUrl, "histórico");
};

export const buscarMatch = ( 
  matchId: string, 
  puuid: string 
): Promise<SearchMatchResponse> => {
  const matchRequestUrl = `match/${matchId}?puuid=${puuid}`;
  
  return fetchEndpoint<SearchMatchResponse>(matchRequestUrl, "detalhes da partida");
};