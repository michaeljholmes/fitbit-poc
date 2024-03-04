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
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { rem } from "polished";
import { Outlet } from "react-router";
import { MobileNavBar } from "./nav";
import { DesktopNavBar } from "./nav/DesktopNavBar";
import { routes } from "./routes";
import { useIsDesktop } from "../hooks/breakpoint";
import { useUser } from "../api/hooks/users/useUser";
import { User } from "../api/api.types";
import { useAuth0 } from "@auth0/auth0-react";
import { useAsync } from "react-use";
import { getUserByEmail } from "../api/requests/userRequests";
import { useRecoilState } from "recoil";
import { loggedInState } from "../state/loggedIn";
import { useIsUserLoggedIn } from "../api/hooks/users/useIsUserLoggedIn";

export interface OutletContext {
  user: User;
}

export const Template = () => {
  
  const isDesktop = useIsDesktop();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState); 

  const onLinkClick = useEventCallback(() => {
    if (!isDesktop) {
      setIsDrawerOpen(false);
    }
  });

  const {isAuthenticated, isLoading: isAuth0Loading, user} = useIsUserLoggedIn();

  const { logout, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if(!isAuthenticated && !isAuth0Loading){
      loginWithRedirect({authorizationParams: {screen_hint:"login"}});
    }
  }, [isAuthenticated, isAuth0Loading]);

  // useAsync(async() => {
  //   if(isAuthenticated && user && user.email){
  //     try {
  //       const loggedInUser = await getUserByEmail(user.email);
  //       setLoggedIn({isLoggedIn: true, userEmail: loggedInUser.email});
  //       return loggedInUser;
  //     } catch (e) {
  //       console.log("Could not find user")
  //     }
  //   }
  // }, [isAuthenticated, user]);

  // useAsync(async () => {
  //   try {
  //     const accessToken = await getAccessTokenSilently();
  //     // Where should I store this function
  //     console.log(accessToken);

  //     const response = await fetch(`http://162.0.223.239:9999/api/health`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [getAccessTokenSilently, user?.sub]);

 // const { data, isLoading } = useUser();

  const signOut = () => logout({logoutParams: {returnTo: import.meta.env.VITE_URL}});

  if(!isAuthenticated || isAuth0Loading){
      return <Stack sx={{mt: 16}} alignItems={"center"}><CircularProgress /></Stack>;
  }

  if(!user) {
      return <p>No user found!</p>
  }

  return isDesktop ? (
    <Stack sx={{ flex: 1 }} height={"100vh"} width={"100vw"}>
      <DesktopNavBar onLinkClick={onLinkClick} routes={routes} signOut={signOut}/>
      <Stack
        sx={{
          backgroundColor: "#E7EEF7",
          height: "100vh",
          flex: 1,
          minWidth: 0,
        }}
      >
        <Outlet context={{user} satisfies OutletContext}/>
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
        <Outlet context={{user}  satisfies OutletContext} />
      </Stack>
      <Drawer
        sx={{
          width: rem(270),
        }}
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <MobileNavBar onLinkClick={onLinkClick} routes={routes} signOut={signOut}/>
      </Drawer>
    </Stack>
  );
};
