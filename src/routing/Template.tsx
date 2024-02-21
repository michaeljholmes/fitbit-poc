import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useEventCallback,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { rem } from "polished";
import { Outlet } from "react-router";
import { MobileNavBar } from "./nav";
import { DesktopNavBar } from "./nav/DesktopNavBar";
import { routes } from "./routes";
import { useIsDesktop } from "../hooks/breakpoint";
import { useUser } from "../api/hooks/useUser";
import { User } from "../api/api.types";
import { useAuth0 } from "@auth0/auth0-react";

export interface OutletContext {
  user: User;
}

export const Template = () => {
  const isDesktop = useIsDesktop();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onLinkClick = useEventCallback(() => {
    if (!isDesktop) {
      setIsDrawerOpen(false);
    }
  });

  const { data, isLoading } = useUser();

  const { isLoading: isAuth0Loading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  console.log(isAuthenticated, user);

  if(!isAuthenticated){
    return ( <Button variant="outlined" onClick={() => loginWithRedirect()}>Log in</Button>);
  }

  if(isLoading){
      return <Stack sx={{mt: 16}} alignItems={"center"}><CircularProgress /></Stack>;
  }

  if(!data) {
      return <p>No user found!</p>
  }

  return isDesktop ? (
    <Stack sx={{ flex: 1 }} height={"100vh"} width={"100vw"}>
      <DesktopNavBar onLinkClick={onLinkClick} routes={routes} />
      <Stack
        sx={{
          backgroundColor: "#E7EEF7",
          height: "100vh",
          flex: 1,
          minWidth: 0,
        }}
      >
        <Outlet context={{user: data} satisfies OutletContext}/>
      </Stack>
    </Stack>
  ) : (
    <Stack height={"100vh"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: (theme) => theme.palette.primary.main,
          pl: 4,
          pr: 4,
          borderBottom: `${rem(3)} solid black`,
        }}
      >
        <Typography fontWeight={"bold"} sx={{ color: "white" }}>
          Welcome
        </Typography>
        <IconButton
          sx={{ color: "white" }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Stack sx={{ height: `calc(100vh - 42px)` }}>
        <Outlet context={{user: data}  satisfies OutletContext} />
      </Stack>
      <Drawer
        sx={{
          width: rem(270),
        }}
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <MobileNavBar onLinkClick={onLinkClick} routes={routes} />
      </Drawer>
    </Stack>
  );
};
