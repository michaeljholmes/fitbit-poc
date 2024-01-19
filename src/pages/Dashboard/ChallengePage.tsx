import { useQuery } from "react-query";
import { Paged } from "../../types";
import { Leaderbaord } from "../../components/Leaderboard";
import { useState } from "react";
import { TeamSummary } from "../../components/TeamSummary";
import { Stack, Box } from "@mui/material";
import { Challenge, Team, User } from "../../api/api.types";

const URL = "http://localhost:6789/";

// These fetches have been modified to work with the mock server I have
const fetchChallenge = async (challengeId: string):Promise<Challenge> => {
  const challenge = await fetch(
    `${URL}challenges?${challengeId}`,
  );
  return challenge.json();
}

// For now, will assume it get paged teams
const fetchTeams = async (
  pageSize: number,
  page: number,
  challengeId: string
): Promise<Paged<Team>> => {
  const totalReponse = await fetch(`${URL}teams?_page=${page + 1}&_limit=${pageSize}`);
  const teams: Team[] = await totalReponse.json();
  return {
    items: teams,
    pageSize,
    page,
    totalItems: 3,
  };
};

const fetchTeam = async (teamIds: string[]): Promise<User[]> => {
  try {
    const response = await fetch(`${URL}users`);
    const users: User[] = await response.json();
    const teamMembers = users.filter(({ id }) =>
      teamIds.some((mid) => mid === id),
    );
    return teamMembers;
  } catch (e) {
    return [];
  }
};

interface ChallengeProps {
 // user: any;
  challengeId: string;
}

// Initially just show winning team

export const ChallengePage = ({
  challengeId,
  
}: ChallengeProps) => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);

  const { isLoading: isChallengeLoading, data: challenge } = useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: () => fetchChallenge(challengeId),
  });

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();

  const { isLoading: isTeamsLoading, data: teams } = useQuery({
    queryKey: ["teams", pageSize, page, challengeId],
    queryFn: () => fetchTeams(pageSize, page, challengeId),
    onSuccess: (teams) => {
      setSelectedTeam(teams.items[0])
    },
    enabled: Boolean(challenge)
  });

  const [selectedRowId, setSelectedRowId] = useState<string[] | undefined>(
    undefined,
  );

  const { data: teamMembers } = useQuery({
    queryKey: ["team", selectedTeam],
    queryFn: () => fetchTeam(selectedTeam?.users ?? []),
    enabled: Boolean(selectedTeam),
  });

  const onSelectedRow = async (row: string[]) => {
    setSelectedRowId(row);
    const team = teams?.items.find(({ id }) => id === row[0]);
    if (team) {
      setSelectedTeam(team);
    }
  };

  return (
    <Box sx={{ height: "100%", backgroundColor: "#ECF0F1" }}>
      <Stack flexDirection={"row"} sx={{ p: 4 }}>
        <TeamSummary users={teamMembers} />
        <Leaderbaord
          sx={{ ml: 2 }}
          rows={teams?.items ?? []}
          onPaginationModelChange={(model) => {
            console.log(model);
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          rowCount={teams?.totalItems ?? 0}
          paginationModel={{ page, pageSize }}
          pageSizeOptions={[2, 4, 6]}
          rowSelectionModel={selectedRowId}
          setRowSelectionModel={onSelectedRow}
          isLoading={isChallengeLoading || isTeamsLoading}
        />
      </Stack>
    </Box>
  );
};
