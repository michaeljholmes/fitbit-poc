import { UseQueryResult, useQuery } from "react-query";
import { getChallengeGenerationLink } from "../../requests/challengeRequests";

export const useGenerateTeamLink = (userId: string): UseQueryResult<string> => {

    // TBD
    const isLoggedIn = true; 

    return useQuery({
      queryKey: ["getTeamGenerationLink", isLoggedIn],
      queryFn: () => getChallengeGenerationLink(userId),
      enabled: Boolean(isLoggedIn)
    });
}