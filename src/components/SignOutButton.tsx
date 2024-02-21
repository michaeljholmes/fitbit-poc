import { Button, SxProps } from "@mui/material";
import { rem } from "polished";

interface SignOutButtonProps {
    onSignout: () => void;
    sx?: SxProps;
}

export const SignOutButton = ({ onSignout, sx }: SignOutButtonProps) => 
    <Button 
        onClick={onSignout}
            sx={{
            ...sx,
            color: "white",
            border: `${rem(1)} solid white`,
            m: 2,
            "&:hover": {
            border: `${rem(1)} solid grey`,
            },
        }} 
        variant="outlined">Sign out</Button>