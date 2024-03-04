import { Team } from "../api.types";
import { getTeamMembersEndpoint } from "./endpoints";

export const fetchTeam = async (teamId: string): Promise<Team> => {
  try {
    const response = await fetch(getTeamMembersEndpoint(teamId));
    let team: Team = await response.json();
    return team;
  } catch (e) {
    // TODO - unsure how to handle this error at the moment
    return {
      rank: 0,
      teamName: "none",
      teamId: "",
      users: [],
      username: "",
      position: 0
    }
  }
};