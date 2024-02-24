import { Stack } from "@mui/material";
import { NavBarProps } from ".";
import { NavMenuLink } from "./NavMenuLink";
import { SignOutButton } from "../../components/SignOutButton";

export const DesktopNavBar = ({ onLinkClick, routes, signOut }: NavBarProps) => {
  return (
    <Stack
      alignItems={"center"}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
      flexDirection={"row"}
      justifyContent={"flex-end"}
    >
      {routes.map(({ icon, text, to }, index) => (
        <NavMenuLink key={index} text={text} to={to} onLinkClick={onLinkClick}>
          {icon}
        </NavMenuLink>
      ))}
      <SignOutButton onSignout={signOut}/>
    </Stack>
  );
};
