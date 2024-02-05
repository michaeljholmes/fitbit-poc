import { api } from "..";
import { Team, User } from "../api.types";

  export const fetchTeam = async (teamIds: string[]): Promise<User[]> => {
    try {
      const response = await fetch(`${api}/users`);
      const users: User[] = await response.json();
      const teamMembers = users.filter(({ id }) =>
        teamIds.some((mid) => mid === id),
      );
      return teamMembers;
    } catch (e) {
      return [];
    }
  };