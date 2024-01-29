import { ChallengePage } from "./ChallengePage";
import { CreateChallenge } from "./CreateChallenge";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../routing/Template";

export const DashboardPage = () => {

    const { user } = useOutletContext<OutletContext>();
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