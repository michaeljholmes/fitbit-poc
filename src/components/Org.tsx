import { Stack, Typography, TableHead, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { rem } from "polished";

export const Org = () => {
    return (
        <Stack sx={{width: rem(300)}}>
            <Stack 
                flexDirection="row"
                justifyContent={"flex-end"}
                alignItems={"center"}
                sx={{pl: 1, pr: 1, mb: 2, backgroundColor: "#4085E5", color: "white", borderRadius: rem(3), height: rem(40)}}>
                <Typography sx={{flex: 1}}>
                    Team1
                </Typography>
                <Typography sx={{width: rem(70)}}>
                    Total
                </Typography>
                <Typography align={"right"} sx={{width: rem(70)}}>
                    45673
                </Typography>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: rem(300), maxWidth: rem(300) }} aria-label="simple table">
                    <TableHead sx={{}}>
                    <TableRow>
                        <TableCell>Team member</TableCell>
                        <TableCell align="right">Steps today</TableCell>
                        <TableCell align="right">Total steps</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {[{name:"Michael", today: 5938, total: 30982},
                        {name:"Ollie", today: 17398, total: 67938}].map(({name, today, total}) => (
                        <TableRow
                            key={name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {name}
                            </TableCell>
                            <TableCell align="right">{today}</TableCell>
                            <TableCell align="right">{total}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>        
        </Stack>
    )
}