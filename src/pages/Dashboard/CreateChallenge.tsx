import { Button, ButtonBase, Tab, Tooltip, Typography } from "@mui/material";
import { CreateChallengeForm } from "../../form/CreateChallengeForm";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, SyntheticEvent } from "react";
import { CreateTeam } from "../../form/CreateTeam";

export const CreateChallenge = () => {

    const [value, setValue] = useState("1");
    const [generatedLink, setGeneratedLink] = useState<string | undefined>();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    const generateLink = () => {
        setGeneratedLink("www.stridewars.com/join-challenge/ijwehf7834fh");
    }

    console.log(generateLink, Boolean(generatedLink))
    
    const hasGeneratedLink = Boolean(generatedLink);

    return (
        <>
            <Typography>
                Welcome to Stridewars!
            </Typography>
            <Typography>
                Simply create a challenge, set up your teams, choose when to start, and begin!
            </Typography>
            <Typography>
                You can have as many teams as you like. Each team can have up to 5 people. There are two ways to create teams, either manually, auto automagically. 
                Haven't got even teams? Not to worry. Any teams with less people will automatically get assinged our friendly BOT walkers to join their teams. 
                These nifty BOTs are keen walkers, they'll be sure not to let their teams down!
            </Typography>
            <ul>
                <li>
                    <Typography>
                        Manual - Simply create teams and add the email addresses of each team below. You can add up to 5 people per team.
                        Those users will receive emails telling them how to join.
                    </Typography>
                </li>
                <li>
                    <Typography>
                        Automatgically - Click the option below to generate a link, send this out to all participants allowing those interested to sign. Just before the challenge begins,
                        all those that joined will be automatically be divided into teams. Odd numbers? Our BOT walkers will make up any extra places. 
                    </Typography>
                </li>
            </ul>
            <TabContext value={value}>
                <TabList onChange={handleChange} >
                    <Tab label={`Manually Create Team`} value="1" disabled={hasGeneratedLink} sx={{...(hasGeneratedLink && {cursor: "not-allowed"})}}/>
                    <Tab label={`Automatic Team Creation`} value="2" />
                </TabList>
                <TabPanel value={"1"}>
                    <CreateChallengeForm />
                </TabPanel>
                <TabPanel value={"2"}>
                    <Typography>Send a link too all those who want to join. 24 hours before the challenge begins, they'll be divided into teams at random.</Typography>
                    <Button variant="outlined" onClick={generateLink} disabled={hasGeneratedLink}>Click here to generate a link</Button>
                    {hasGeneratedLink && 
                        <>
                            <Typography>Click the link to copy it.</Typography>
                            <Tooltip title={`Click to copy link`}>
                                <ButtonBase onClick={() => {navigator.clipboard.writeText(generatedLink as string)}}>
                                    <Typography sx={{color: "red", textDecoration: "underline"}}>{generatedLink}</Typography>
                                </ButtonBase>
                            </Tooltip>
                        </>}
                </TabPanel>
            </TabContext>
        </>
    );
}