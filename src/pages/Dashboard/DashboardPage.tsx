import { ChallengePage } from "./ChallengePage";
import { CreateChallenge } from "./CreateChallenge";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../routing/Template";

export const DashboardPage = () => {

    const { user } = useOutletContext<OutletContext>();
    const {isCreator, createdId, challengeId} = user;

    if(challengeId) {
        return (
            <ChallengePage user={user} challengeId={challengeId} />
        )
    }

    if(isCreator){
        if(!createdId) {
            return <CreateChallenge user={user}/>
        }
    }
    
    return (
        <p>
            Oh no, somethings gone wrong
        </p>
    )
}