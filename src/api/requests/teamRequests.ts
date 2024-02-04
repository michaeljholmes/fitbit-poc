import { Paged } from "../../types";
import { Team, User } from "../api.types";

// For now, will assume it get paged teams
export const fetchTeams = async (
    pageSize: number,
    page: number
    ): Promise<Paged<Team>> => {
    const totalReponse = await fetch(`${URL}teams?_page=${page + 1}&_limit=${pageSize}`);
    const teams: Team[] = await totalReponse.json();
    return {
      items: teams,
      pageSize,
      page,
      totalItems: 3,
    };
  };

  export const fetchTeam = async (teamIds: string[]): Promise<User[]> => {
    try {
      const response = await fetch(`${URL}users`);
      const users: User[] = await response.json();
      const teamMembers = users.filter(({ id }) =>
        teamIds.some((mid) => mid === id),
      );
      return teamMembers;
    } catch (e) {
      return [];
    }
  };