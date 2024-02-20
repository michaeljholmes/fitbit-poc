import { api } from "..";
import { Paged } from "../../types";
import { Challenge, Team, User } from "../api.types";

export const fetchChallenge = async (challengeId: string):Promise<Challenge> => {
    const challenge = await fetch(
      `${api}/challenges/${challengeId}`,
    );
    return challenge.json();
  }

  export const fetchChallengeMembers = async (challengeId: string):Promise<User[]> => {
    const result = await fetch(
      `${api}/users`,
    );
    return await result.json();
  }  

  // For now, will assume it get paged teams
export const fetchChallengeTeams = async (
  pageSize: number,
  page: number
  ): Promise<Paged<Team>> => {
  const totalReponse = await fetch(`${api}/teams?_page=${page + 1}&_limit=${pageSize}`);
  const teams: Team[] = await totalReponse.json();
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