import { useQuery } from "react-query";
import { Leaderbaord } from "../../components/Leaderboard";
import { useMemo, useState } from "react";
import { TeamSummary } from "../../components/TeamSummary";
import { Stack, Box, Typography } from "@mui/material";
import { NotFitbitIntegrated } from "../../components/NotFitbitIntegrated";
import { useCompetition } from "../../api/hooks/useCompetition";
import { fetchCompetitionTeams } from "../../api/requests/competitionRequests";
import { Team, User } from "../../api/api.types";
import { isDateInFuture } from "../../utils/isDateInFuture";
import { IsOwner } from "../../components/IsOwner";
import { CompetitionNotStarted } from "../../components/CompetitionNotStarted";

interface CompetitionProps {
  user: User;
  competitionId: string;
}

// Initially just show winning team

export const Competition = ({
  competitionId,
  user: {
    isFitbitIntegrated,
    userId
  }
}: CompetitionProps) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const isNotFitbitEnabled = !isFitbitIntegrated;

  const { isLoading: isCompetitionLoading, data: competition } = useCompetition(competitionId);
  const isCompetitionInFuture = useMemo(() => 
    competition?.startTime ? isDateInFuture(competition.startTime): false, [competition]);

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();

  const [sortedTeams, setSortedTeams] = useState<Team[]>([]);

  const { isLoading: isTeamsLoading, data: teams } = useQuery({
    queryKey: ["teams", pageSize, page],
    queryFn: () => fetchCompetitionTeams(competitionId, pageSize, page),
    onSuccess: (teams) => {
      if(teams?.items){
        setSelectedTeam(teams.items[0]);
        const copy = [...teams.items];
        setSortedTeams(copy.sort((a, b) => a.rank - b.rank));
      }
    },
    enabled: Boolean(competition)
  });

  const [selectedRowId, setSelectedRowId] = useState<string[] | undefined>(
    undefined,
  );

  const isOwner = useMemo(() => competition?.owner.userId === userId, [userId, competition]);

  const onSelectedRow = async (row: string[]) => {
    setSelectedRowId(row);
    const team = teams?.items.find(({ teamId }) => teamId === row[0]);
    if (team) {
      setSelectedTeam(team);
    }
  };

  if(isCompetitionLoading){
    return <Typography>Loading...</Typography>
  }

  if(!competition){
    return <Typography>No competition found</Typography>
  }
  console.log(sortedTeams);
  console.log(pageSize * page, (pageSize * page) + pageSize)
  return (
    <Stack sx={{ height: "100%", backgroundColor: "#ECF0F1", p: 2}}>
      {isOwner && isCompetitionInFuture && <IsOwner sx={{mb: 2}} competitionId={competitionId} />}
      {isNotFitbitEnabled && <NotFitbitIntegrated />} 
      {isCompetitionInFuture ?
        <CompetitionNotStarted competition={competition}/>
        :
        <Stack sx={{flex: 1, position: "relative"}}>
          <Box sx={{...(isNotFitbitEnabled ? {position: "absolute", backgroundColor: "black", flex: 1, width: "100%", height: "100%", opacity: 0.5, zIndex: 2}: {})}}/>
          <Stack flexDirection={"row"} sx={{ p: 4}}>
            <TeamSummary team={selectedTeam} />
            <Leaderbaord
              sx={{ ml: 2 }}
              rows={sortedTeams.slice(pageSize * page, (pageSize * page) + pageSize)}
              onPaginationModelChange={(model) => {
                setPage(model.page);
                setPageSize(model.pageSize);
              }}
              getRowId={(row: Team) => row?.teamId}
              rowCount={teams?.totalItems ?? 0}
              paginationModel={{ page, pageSize }}
              pageSizeOptions={[10, 15, 20]}
              rowSelectionModel={selectedRowId}
              setRowSelectionModel={onSelectedRow}
              isLoading={isCompetitionLoading || isTeamsLoading}
            />
          </Stack>
        </Stack>
      }  
    </Stack>
  );
};
