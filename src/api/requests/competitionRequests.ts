import { api } from "..";
import { Paged } from "../../types";
import { Competition, Team, User } from "../api.types";
import { getCompetitionEndpoint, getCompetitionMembersEndpoint, getCompetitionTeamsEndpoint, getTeamMembersEndpoint } from "./endpoints";

export const fetchCompetition = async (competitionId: string):Promise<Competition> => {
    const competitionResponse = await fetch(getCompetitionEndpoint(competitionId));
    return await competitionResponse.json();
  }

  export const fetchCompetitionMembers = async (competitionId: string):Promise<User[]> => {
    const competitionMembersResponse = await fetch(getCompetitionMembersEndpoint(competitionId));
    return await competitionMembersResponse.json();
  }  

  // For now, will assume it get paged teams
  // TODO PAGING TO CONSIDE
export const fetchCompetitionTeams = async (
  competitionId: string,
  pageSize: number,
  page: number
  ): Promise<Paged<Team>> => {
 //  const totalReponse = await fetch(`${api}/teams?_page=${page + 1}&_limit=${pageSize}`);
  const teamResponse = await fetch(getCompetitionTeamsEndpoint(competitionId));
  const teamResult =  await teamResponse.json();
  return {
    items: teamResult,
    pageSize,
    page,
    totalItems: 3,
  };
};


  // Join team could likly be a patch to update the team and the users team... 
  export const joinCompetition = async (competitionId: string, name: string): Promise<Team | undefined> => {
    try {
    const team = await fetch(`${api}/competition/${competitionId}`, {
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
  export const getCompetitionGenerationLink = async (userId: string): Promise<string> => {
    try {
      return new Promise((resolve) => {
        resolve(`${import.meta.env.VITE_URL}/join-competition?competitionId=competitionId`)
      })
    } catch (e) {
      return "";
    }
  };