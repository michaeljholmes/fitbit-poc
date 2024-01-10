import { Stack } from "@mui/material"
import { rem } from "polished"
import { NavBarProps } from "."
import { NavMenuLink } from "./NavMenuLink";

export const MobileNavBar = ({onLinkClick, routes}: NavBarProps) => {
    return (
        <Stack 
            alignItems={"center"}
            sx={{
                minWidth: rem(250),
                height: "100vh",
                backgroundColor: (theme) => theme.palette.primary.main
            }}
        >
            <Stack width="100%" sx={{pt: 4}}>
                {routes.map(({icon, text, to}, index) => <NavMenuLink key={index} text={text} to={to} onLinkClick={onLinkClick}>{icon}</NavMenuLink>)}
            </Stack>
        </Stack>
    );
}