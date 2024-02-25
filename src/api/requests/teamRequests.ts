import { Team } from "../api.types";
import { getTeamMembersEndpoint } from "./endpoints";

const isProduction = import.meta.env.MODE === "production";

export const fetchTeam = async (teamId: string): Promise<Team> => {
  try {
    const response = await fetch(getTeamMembersEndpoint(teamId));
    let team: Team = await response.json();
    return team;
  } catch (e) {
    return {
      id: "",
      users: [],
      username: "",
      position: 0
    }
  }
};