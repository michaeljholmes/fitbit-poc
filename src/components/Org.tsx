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
} from "@mui/material";
import { rem } from "polished";
import { User } from "../types";

interface OrgProps {
  users?: User[];
}

export const Org = ({ users }: OrgProps) => {
  return (
    <Stack sx={{ width: rem(300) }}>
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
        <Typography sx={{ flex: 1 }}>Optix</Typography>
        <Typography sx={{ width: rem(70) }}>Total</Typography>
        <Typography sx={{ width: rem(70) }}>Optix</Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: rem(300), maxWidth: rem(300) }}
          aria-label="simple table"
        >
          <TableHead sx={{}}>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">Today</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map(({ name }) => (
              <TableRow
                key={name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">{"today"}</TableCell>
                <TableCell align="right">{"total"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
