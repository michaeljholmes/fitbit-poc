import { api } from "..";
import { Paged } from "../../types";
import { Challenge, Team, User } from "../api.types";
import { getCompetitionEndpoint, getCompetitionTeamsEndpoint, getTeamMembersEndpoint } from "./endpoints";
const isProduction = import.meta.env.MODE === "production";

export const fetchChallenge = async (competitionId: string):Promise<Challenge> => {
    const challengeResponse = await fetch(getCompetitionEndpoint(competitionId));
    return await challengeResponse.json();
  }

  export const fetchChallengeMembers = async (challengeId: string):Promise<User[]> => {
    const result = await fetch(
      `${api}/users`,
    );
    return await result.json();
  }  

  // For now, will assume it get paged teams
  // TODO PAGING TO CONSIDE
export const fetchChallengeTeams = async (
  competitionId: string,
  pageSize: number,
  page: number
  ): Promise<Paged<Team>> => {
 //  const totalReponse = await fetch(`${api}/teams?_page=${page + 1}&_limit=${pageSize}`);
  const teamIdsResponse = await fetch(getCompetitionTeamsEndpoint(competitionId));
  const teamIdsResult =  await teamIdsResponse.json();
  let teamIds = []; 
  if(isProduction){
    teamIds = teamIdsResult;
  } else {
    teamIds = teamIdsResult.teams
  }
  const teams: Team[] = await Promise.all(teamIds.map(async (teamId: string) => {
    const teamIdsResponse =  await fetch(getTeamMembersEndpoint(teamId));
    const members =  teamIdsResponse.json();
    return {
      id: teamId,
      users: members,
      name: teamId
    }
  }));
  return {
    items: teams,
    pageSize,
    page,
    totalItems: 3,
  };
};


  // Join team could likly be a patch to update the team and the users team... 
  export const joinChallenge = async (challengeId: string, name: string): Promise<Team | undefined> => {
    try {
    const team = await fetch(`${api}/challenge/${challengeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    return await team.json();
  } catch (e) {
    // HOW TO HANDLE NOT BEING ABLE TO JOIN A TEAM
    return;
  }
};

  // Unsure as to what the backend might need to generate the link
  export const getChallengeGenerationLink = async (userId: string): Promise<string> => {
    try {
      return new Promise((resolve) => {
        resolve(`${import.meta.env.VITE_URL}/join-challenge?challengeId=challenge1`)
      })
    } catch (e) {
      return "";
    }
  };