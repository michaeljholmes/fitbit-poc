import { rem } from "polished";
import { PropsWithChildren } from "react";
import { styled } from "@mui/material";
import { useIsTabletDown } from "../hooks/breakpoint";

export const BackgroundHeader = ({children}: PropsWithChildren) => {
    const isLessThanMobile = useIsTabletDown();
    return (
        <Header sx={{ pl: 0.5, pr: 0.5, backgroundPosition: isLessThanMobile ? `calc(50% + ${rem(25)}) 50%` : "center center"}}>
            {children}
        </Header>
    )
}

const Header = styled(`header`)(({ theme }) => ({
    background: `url("./stridewars_reduced.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    zIndex: 1,
    "&::before": {
      backgroundColor: theme.palette.common.black,
      opacity: 0.8,
      height: "100vh",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      content: '""',
    },
  }));