import { UseQueryResult, useQuery } from "react-query";
import { Challenge } from "../api.types";
import { fetchChallenge } from "../requests/challengeRequests";

export const useChallenge = (challengeId: string): UseQueryResult<Challenge> => {
    return useQuery({
        queryKey: ["challenge", challengeId],
        queryFn: () => fetchChallenge(challengeId)
    });
}