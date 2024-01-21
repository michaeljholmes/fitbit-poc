import { PropsWithChildren, useState } from "react";
import { ChallengePage } from "./ChallengePage";
import { CreateChallenge } from "./CreateChallenge";
import { Button, Stack } from "@mui/material";
import { User } from "../../api/api.types";

const newUserNoFitbit = {
    id: "2",
    email: "test1@test.com",
    name: "test1",
    password: "test",
    isCreator: true,
    createdId: "challenge1",
    participantId: "challenge1",
    isFitbitIntegrated: false
  };

  const newCreator = {
    id: "user5",
    email: "test5@test.com",
    name: "test5",
    password: "test",
    isCreator: true,
    isFitbitIntegrated: false
}

const newUserWithFitbit = {
    id: "2",
    email: "test1@test.com",
    name: "test1",
    password: "test",
    isCreator: true,
    createdId: "challenge1",
    participantId: "challenge1",
    isFitbitIntegrated: true
  };

export const DashboardPage = () => {

    const [user, setUser] = useState(newCreator);

    return (
        <Stack sx={{flex: 1}}>
            <Stack flexDirection="row" sx={{m: 1}}>
                <Button variant="outlined" onClick={() => setUser(newCreator)}>
                    New Creator
                </Button>
                <Button variant="outlined" onClick={() => setUser(newUserNoFitbit)}>
                    New User
                </Button>
                <Button variant="outlined" onClick={() => setUser(newUserWithFitbit)}>
                    New User with Fitbit
                </Button>
            </Stack>
            <DashboardPageWithUser user={user}/>
        </Stack>
    );
}

interface DashboardProps {
    user: User;
}

const DashboardPageWithUser = ({user}: DashboardProps) => {
    
    const {isCreator, createdId, participantId} = user;

    if(participantId) {
        return (
            <ChallengePage user={user} challengeId={participantId} />
        )
    }

    if(isCreator){
        if(!createdId) {
            return <CreateChallenge />
        }
    }
    
    return (
        <p>
            Oh no, somethings gone wrong
        </p>
    )
}