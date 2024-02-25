import { UseMutationResult, useMutation } from "react-query";
import { Team } from "../../api.types";
import { joinCompetition } from "../../requests/competitionRequests";

interface JoinTeam {
    name: string;
    competitionId: string,
}

export const useJoinTeam = (): UseMutationResult<Team | undefined, unknown, JoinTeam>=> {
    return useMutation({
      mutationFn: ({competitionId, name}) => joinCompetition(competitionId, name),
      mutationKey: ["joinTeam"]
    });
}