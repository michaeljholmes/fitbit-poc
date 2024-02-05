import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { connectToFitbit } from "../../requests/userRequests";
import { Team } from "../../api.types";
import { joinChallenge } from "../../requests/challengeRequests";

interface JoinTeam {
    name: string;
    challengeId: string,
}

export const useJoinTeam = (): UseMutationResult<Team | undefined, unknown, JoinTeam>=> {
    return useMutation({
      mutationFn: ({challengeId, name}) => joinChallenge(challengeId, name),
      mutationKey: ["joinTeam"]
    });
}