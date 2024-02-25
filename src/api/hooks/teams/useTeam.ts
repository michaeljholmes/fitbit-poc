import { UseQueryResult, useQuery } from "react-query";
import { Team } from "../../api.types";
import { fetchTeam } from "../../requests/teamRequests";

export const useTeam = (selectedTeam?: Team): UseQueryResult<Team> => {
    return useQuery({
        queryKey: ["team", selectedTeam],
        queryFn: () => fetchTeam(selectedTeam?.id!),
        enabled: Boolean(selectedTeam?.id),
      });
}

