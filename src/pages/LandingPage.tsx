import { Typography, styled } from "@mui/material";

export const LandingPage = () => {
    return (
        <>
            <header>
                <Typography variant="h1">
                    Stride Wars
                </Typography>
                <Typography>
                    The ultimate step competition with a twist
                </Typography>
            </header>
            <FirstCompetitionSection>

            </FirstCompetitionSection>
        </>
    );
}

const FirstCompetitionSection = styled(`section`)({
    backgroundColor: "#111",
    color: "white",
    padding: "30px 20px",
    boxShadow: "0 4px 6px rgba(35, 35, 35, 0.15)",
    textAlign: "center"
});