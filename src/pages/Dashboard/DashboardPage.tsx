import { ChallengePage } from "./ChallengePage";
import { CreateChallenge } from "./CreateChallenge";

const loggedInUser = {
    id: "2",
    email: "test1@test.com",
    name: "test1",
    password: "test",
    isCreator: true,
    createdId: "challenge1",
    participantId: "challenge1"
  };

export const DashboardPage = () => {
    
    const {isCreator, createdId, participantId} = loggedInUser;

    if(participantId) {
        return (
            <ChallengePage challengeId={participantId} />
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