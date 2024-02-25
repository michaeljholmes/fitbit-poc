import { UseQueryResult, useQuery } from "react-query";
import { Competition } from "../api.types";
import { fetchCompetition } from "../requests/competitionRequests";

export const useCompetition = (competitionId?: string): UseQueryResult<Competition> => {
    return useQuery({
        queryKey: ["competition", competitionId],
        queryFn: () => fetchCompetition(competitionId ?? ""),
        enabled: Boolean(competitionId)
    });
}