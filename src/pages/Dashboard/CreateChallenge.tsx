import { Typography } from "@mui/material";

export const CreateChallenge = () => {
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
            
        </>
    );
}