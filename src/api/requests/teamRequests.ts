import { User } from "../api.types";
import { getTeamMembersEndpoint } from "./endpoints";

  export const fetchTeam = async (teamId: string): Promise<User[]> => {
    try {
      const response = await fetch(getTeamMembersEndpoint(teamId));
      let teamMembers: User[] = await response.json();
      return teamMembers;
    } catch (e) {
      return [];
    }
  };