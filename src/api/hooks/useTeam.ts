import { UseQueryResult, useQuery } from "react-query";
import { Team, User } from "../api.types";
import { fetchTeam } from "../requests/teamRequests";

export const useTeam = (selectedTeam?: Team): UseQueryResult<User[]> => {
    return useQuery({
        queryKey: ["team", selectedTeam],
        queryFn: () => fetchTeam(selectedTeam?.users ?? []),
        enabled: Boolean(selectedTeam),
      });
}

