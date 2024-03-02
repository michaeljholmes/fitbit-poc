import { Stack } from "@mui/material";
import { rem } from "polished";
import { NavBarProps } from ".";
import { NavMenuLink } from "./NavMenuLink";
import { ActionButton } from "../../components/ActionButton";

export const MobileNavBar = ({ onLinkClick, routes, signOut }: NavBarProps) => {
  return (
    <Stack
      alignItems={"center"}
      sx={{
        minWidth: rem(250),
        height: "100vh",
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Stack width="100%" sx={{ pt: 4 }} height={"100%"} justifyContent={"space-between"}>
        <Stack>
          {routes.map(({ icon, text, to }, index) => (
            <NavMenuLink
              key={index}
              text={text}
              to={to}
              onLinkClick={onLinkClick}
            >
              {icon}
            </NavMenuLink>
          ))}
        </Stack>
        <ActionButton sx={{mb: 6}} onClick={signOut} text="Sign out"/>
      </Stack>
    </Stack>
  );
};
