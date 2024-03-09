import { useQuery } from "react-query";
import { Leaderbaord } from "../../components/Leaderboard";
import { useMemo, useState } from "react";
import { TeamSummary } from "../../components/TeamSummary";
import { Stack, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { NotFitbitIntegrated } from "../../components/NotFitbitIntegrated";
import { useCompetition } from "../../api/hooks/useCompetition";
import { fetchCompetitionTeams } from "../../api/requests/competitionRequests";
import { Team, User } from "../../api/api.types";
import { isDateInFuture } from "../../utils/isDateInFuture";
import { IsOwner } from "../../components/IsOwner";
import { CompetitionNotStarted } from "../../components/CompetitionNotStarted";
import { useIsMobile, useIsTabletDown } from "../../hooks/breakpoint";
import { rem } from "polished";

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

  const isTabletDown = useIsTabletDown();
  const isMobile = useIsMobile();

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const isNotFitbitEnabled = false;//!isFitbitIntegrated;

  const [openModal, setOpenModal] = useState(false);

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
      setOpenModal(true);
    }
  };

  if(isCompetitionLoading){
    return <Typography>Loading...</Typography>
  }

  if(!competition){
    return <Typography>No competition found</Typography>
  }

  return (
    <Stack sx={{ height: "100%", backgroundColor: "#ECF0F1", p: 2}}>
      {isOwner && isCompetitionInFuture && <IsOwner sx={{mb: 2}} competitionId={competitionId} />}
      {isNotFitbitEnabled && <NotFitbitIntegrated />} 
      {isCompetitionInFuture ?
        <CompetitionNotStarted competition={competition}/>
        :
        <Stack sx={{flex: 1, position: "relative"}}>
          <Box sx={{...(isNotFitbitEnabled ? {position: "absolute", backgroundColor: "black", flex: 1, width: "100%", height: "100%", opacity: 0.5, zIndex: 2}: {})}}/>
          <Stack flexDirection={isTabletDown ? "column" : "row"} sx={{ p: 2}}>
            {isTabletDown ? 
            <>
            <Typography sx={{mb: 1}}>Select a team to view more detail!</Typography>
              <Dialog
                open={Boolean(selectedTeam) && openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="selected-team-title"
                aria-describedby="selected-team-description"
              >
                <DialogContent sx={{p: isMobile? 2: 5}}>
                  <TeamSummary widthPx={isMobile ? 250 : 300} team={selectedTeam} />
                </DialogContent>
                <DialogActions sx={{pr: 5, pb: 5}}>
                  <Button variant="outlined" onClick={() => setOpenModal(false)} autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </>
            : <TeamSummary team={selectedTeam} />}
            <Leaderbaord
              sx={{...(!isTabletDown && {ml: 2 })}}
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
