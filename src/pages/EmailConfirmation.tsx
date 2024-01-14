import { Typography, styled } from "@mui/material";
import { useState, useEffect} from "react"

export const EmailConfirmationPage = () => {
    const [text, setText] = useState("Attempting to verify your email address...")
    const url = "https://www.stridewars.com/api/verify-email"
    const params = new URLSearchParams(window.location.search)
    let emailAddress = params.get("emailAddress")
    let verificationCode = params.get("verificationCode")

    useEffect(() => {
        if (emailAddress === null || verificationCode === null) 
        {
            setText("Please use the email verification link provided in your email.")
            return;
        }
        setText("Verifying email address")
            fetch(`${url}?emailAddress=${emailAddress}&verificationCode=${verificationCode}`)
          .then((res) => {
            if (res.status === 200) {
                setText("Thank you - your email address has been verified");
            }
            if (res.status === 409) {
                setText("Your email address has already been verified");
            }
            if (res.status === 400) {
                setText("Could not verify email address. Please try again or email info@stridewars.com");
            }
          })
          .catch(error => {
            setText("Email cannot be verified. Please try again or email info@stridewars.com if you are having issues");
          })
      }, []);

    return (
        <>
            <header>
                <Typography variant="h1">
                 Email Verification
                </Typography>
                <Typography>
                    {text}
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