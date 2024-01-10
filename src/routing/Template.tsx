import { Box, Drawer, IconButton, Stack, Typography, useEventCallback } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { rem } from "polished";
import { Outlet } from "react-router";
import { useMediaQuery, Theme } from "@mui/material";
import { MobileNavBar } from "./nav";
import { DesktopNavBar } from "./nav/DesktopNavBar";
import { routes } from "./routes";


export const useIsDesktop = () => useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

export const useIsTablet = () => useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

export const useIsMobile = () => useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));


export const Template = () => {
    
    const isDesktop = useIsDesktop();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const onLinkClick = useEventCallback(() => {
        if (!isDesktop) {
            setIsDrawerOpen(false);
        }
    });

    return (
            isDesktop ? 
                <Stack sx={{flex: 1}} height={"100vh"} width={"100vw"}>
                    <DesktopNavBar onLinkClick={onLinkClick} routes={routes}/>
                    <Box sx={{backgroundColor: "#E7EEF7", height: "100vh", flex: 1, minWidth: 0}}> 
                        <Outlet/>
                    </Box>
                </Stack>
                :
                <Stack height={"100vh"} >
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: (theme) => theme.palette.primary.main,
                        pl: 4,
                        pr: 4,
                        borderBottom: `${rem(3)} solid black`}}
                    >
                        <Typography fontWeight={"bold"} sx={{color: "white"}}>Welcome</Typography>
                        <IconButton sx={{color: "white"}} onClick={() => setIsDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Box> 
                    <Box sx={{height: `calc(100vh - 42px)`}}>
                        <Outlet />
                    </Box>
                    <Drawer
                        sx={{
                            width: rem(270)
                        }}
                        anchor={"left"}
                        open={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                        >
                        <MobileNavBar onLinkClick={onLinkClick} routes={routes} />
                    </Drawer>
                </Stack>
    );
}