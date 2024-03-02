import { Button, SxProps } from "@mui/material";
import { rem } from "polished";

interface SignOutButtonProps {
    onClick: () => void;
    sx?: SxProps;
    text: string;
}

export const ActionButton = ({ onClick, sx, text}: SignOutButtonProps) => 
    <Button 
        onClick={onClick}
            sx={{
            ...sx,
            color: "white",
            border: `${rem(1)} solid white`,
            m: 2,
            "&:hover": {
            border: `${rem(1)} solid grey`,
            },
        }} 
        variant="outlined">{text}</Button>