import { Typography } from "@mui/material";
import { rem } from "polished";
import { Copyright } from "../components/Copyright";
import { BackgroundHeader } from "../components/BackgroundHeader";
import { useIsMobile } from "../hooks/breakpoint";

export const VerificationPage = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <BackgroundHeader >
        <>
          <Typography
            variant="h1"
            sx={{
              m: 2,
              color: (theme) => theme.palette.common.white,
              zIndex: 2,
              fontSize: isMobile ? "3rem" : "5rem",
              fontFamily: "'Holtwood One SC', serif",
              textAlign: "center",
            }}
          >
            Stride Wars
          </Typography>
          <Typography
            sx={{
              color: "#e9c46a",
              fontFamily: "'Courier New', Courier, monospace;",
              zIndex: 2,
              fontSize: "1.5rem",
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: 900,
            }}
          >
            You're all verified, we'll email you when we are ready to begin.
          </Typography>
        </>
      </BackgroundHeader>
      <Copyright
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.common.white,
          height: rem(100),
          lineHeight: rem(100),
        }}
        websiteLink="https://www.stridewars/com"
        websiteName="Stride Wars"
      />
    </>
  );
};