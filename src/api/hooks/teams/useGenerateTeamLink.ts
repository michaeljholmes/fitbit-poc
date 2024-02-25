import { UseQueryResult, useQuery } from "react-query";
import { getCompetitionGenerationLink } from "../../requests/competitionRequests";

export const useGenerateTeamLink = (userId: string): UseQueryResult<string> => {

    // TBD
    const isLoggedIn = true; 

    return useQuery({
      queryKey: ["getTeamGenerationLink", isLoggedIn],
      queryFn: () => getCompetitionGenerationLink(userId),
      enabled: Boolean(isLoggedIn)
    });
}