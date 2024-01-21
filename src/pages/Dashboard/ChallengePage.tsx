import { useQuery } from "react-query";
import { Paged } from "../../types";
import { Leaderbaord } from "../../components/Leaderboard";
import { useState } from "react";
import { TeamSummary } from "../../components/TeamSummary";
import { Stack, Box, Typography, Button } from "@mui/material";
import { Challenge, Team, User } from "../../api/api.types";
import { rem } from "polished";
import { useNavigate } from "react-router";

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
  user: User;
  challengeId: string;
}

// Initially just show winning team

export const ChallengePage = ({
  challengeId,
  user
}: ChallengeProps) => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);
  const isNotFitbitEnabled = !user.isFitbitIntegrated;
  const navigate = useNavigate();

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
    <Stack sx={{ height: "100%", backgroundColor: "#ECF0F1" }}>
      {isNotFitbitEnabled && 
        <Stack alignItems={"center"} sx={{m: 1}}>
          <Typography textAlign="center" variant="h2">You must connect Stridewars with fitbit before we can track your steps!</Typography>
          <Typography textAlign="center" variant="h3">Its easy to set up and totally free. Haven't got a fitbit, not to worry, you can use your phone, with the Fitbit app to count your steps.</Typography>
          <Button sx={{m: 1, width: rem(250)}} onClick={() => navigate("tracker")} variant="outlined">Click here to get set up!</Button>
        </Stack>}
      <Stack sx={{flex: 1, position: "relative"}}>
        <Box sx={{...(isNotFitbitEnabled && {position: "absolute", backgroundColor: "black", flex: 1, width: "100%", height: "100%", opacity: 0.5, zIndex: 2})}}/>
        <Stack flexDirection={"row"} sx={{ p: 4}}>
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
      </Stack>  
    </Stack>
  );
};
