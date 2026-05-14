import type { MatchDetail, MatchTeam, Participant } from "../../types/matchDetail";
import type {
  SearchHistoryApiData,
  SearchHistoryApiResponse,
  SearchHistoryData,
  SearchHistoryResponse,
  SearchMatchApiResponse,
  SearchMatchResponse,
} from "./types";

const DEFAULT_BASE_URL = "https://cadeodanobackend.livelywater-5b3a910a.eastus.azurecontainerapps.io/";
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL;

async function fetchEndpoint<TResponse>(endpoint: string, requestLabel: string): Promise<TResponse> {
  const apiRequestUrl = `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const res = await fetch(apiRequestUrl);

  if (!res.ok) {
    throw new Error(`Erro ao buscar ${requestLabel}: ${res.status}`);
  }

  return res.json();
}

function isNewSearchHistoryData(data: SearchHistoryApiData): data is Extract<SearchHistoryApiData, { profile: unknown }> {
  return "profile" in data && "rankedStats" in data && "matches" in data;
}

function normalizeSearchHistoryData(data: SearchHistoryApiData): SearchHistoryData {
  if (!isNewSearchHistoryData(data)) return data;

  return {
    puuid: data.profile.puuid,
    summonerName: data.profile.summonerName,
    profileIconUrl: data.profile.profileIconUrl,
    summonerLevel: data.profile.summonerLevel,
    summonerElos: data.rankedStats.elos,
    recentMatches: data.matches.recentMatches,
    mostPlayedChampions: data.matches.mostPlayedChampions,
    highestDamageChampions: data.matches.highestDamageChampions,
  };
}

function getFallbackTeams(matchDetails: MatchDetail): MatchTeam[] {
  const teams: MatchTeam[] = [];

  if (matchDetails.team1?.length) {
    teams.push({
      teamId: matchDetails.team1[0]?.teamId ?? 100,
      totalTeamKills: matchDetails.team1.reduce((totalKills, participant) => totalKills + participant.kills, 0),
      participants: matchDetails.team1,
    });
  }

  if (matchDetails.team2?.length) {
    teams.push({
      teamId: matchDetails.team2[0]?.teamId ?? 200,
      totalTeamKills: matchDetails.team2.reduce((totalKills, participant) => totalKills + participant.kills, 0),
      participants: matchDetails.team2,
    });
  }

  return teams;
}

function normalizeParticipant(participant: Participant): Participant {
  return {
    ...participant,
    summonerName: participant.summonerName ?? "",
    championName: participant.championName ?? "",
    championIconUrl: participant.championIconUrl ?? "",
    championSplashArtUrl: participant.championSplashArtUrl ?? "",
    itemIconUrls: participant.itemIconUrls ?? [],
    summonerElos: participant.summonerElos ?? [],
  };
}

function normalizeMatchDetails(matchDetails: MatchDetail): MatchDetail {
  const teams = (matchDetails.teams?.length ? matchDetails.teams : getFallbackTeams(matchDetails))
    .map((team) => ({
      ...team,
      participants: team.participants.map(normalizeParticipant),
    }))
    .sort((firstTeam, secondTeam) => firstTeam.teamId - secondTeam.teamId);

  const [team1, team2] = teams;
  const searchedPlayer = teams
    .flatMap((team) => team.participants)
    .find((participant) => participant.isSearchedPlayer);

  return {
    ...matchDetails,
    teams,
    team1: team1?.participants ?? [],
    team2: team2?.participants ?? [],
    playerWin: matchDetails.playerWin ?? searchedPlayer?.win ?? false,
  };
}

export const buscarHistorico = (
  nick: string,
  tag: string,
): Promise<SearchHistoryResponse> => {
  const historyRequestUrl = `search/${encodeURIComponent(nick)}/${encodeURIComponent(tag)}?count=100`;

  return fetchEndpoint<SearchHistoryApiResponse>(historyRequestUrl, "historico")
    .then((response) => ({
      ...response,
      data: normalizeSearchHistoryData(response.data),
    }));
};

export const buscarMatch = (
  matchId: string,
  puuid: string,
): Promise<SearchMatchResponse> => {
  const matchRequestUrl = `match/${matchId}?puuid=${puuid}`;

  return fetchEndpoint<SearchMatchApiResponse>(matchRequestUrl, "detalhes da partida")
    .then((response) => ({
      ...response,
      data: normalizeMatchDetails(response.data),
    }));
};
