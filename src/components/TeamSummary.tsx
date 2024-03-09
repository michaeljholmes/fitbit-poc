import {
  Stack,
  Typography,
  TableHead,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  SxProps,
} from "@mui/material";
import { rem } from "polished";
import { Team } from "../api/api.types";

interface TeamSummaryProps {
  team?: Team;
  widthPx?: number
}

export const TeamSummary = ({ team, widthPx = 300 }: TeamSummaryProps) => {

  return (
    <Stack sx={{ width: rem(widthPx), zIndex: 1}}>
      {!team ? <CircularProgress sx={{alignSelf: "center"}}/> :
      <>
        <Stack
          flexDirection="row"
          justifyContent={"flex-end"}
          alignItems={"center"}
          sx={{
            pl: 1,
            pr: 1,
            mb: 2,
            backgroundColor: "#4085E5",
            color: "white",
            borderRadius: rem(3),
            height: rem(40),
          }}
        >
          <Typography sx={{ flex: 1 }}>{team.teamName}</Typography>
          {/* <Typography align="right" sx={{ width: rem(90) }}>Team Total</Typography> */}
          <Typography align="right" sx={{ width: rem(80) }}>{team.users.reduce((acc, cv) => acc + cv.steps, 0)}</Typography>
        </Stack>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: rem(widthPx), maxWidth: rem(300) }}
            aria-label="simple table"
          >
            <TableHead sx={{}}>
              <TableRow>
                <TableCell >Members</TableCell>
                <TableCell align="right">Steps</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.users?.map(({userId, username, steps }) => (
                <TableRow
                  key={userId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {username}
                  </TableCell>
                  <TableCell align="right">{steps}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    }  
  </Stack>
  );
};
