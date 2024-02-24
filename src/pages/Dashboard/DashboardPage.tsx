import { Challenge } from "./Challenge";
import { CreateChallenge } from "./CreateChallenge";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../routing/Template";
import { Stack } from "@mui/material";

console.log(import.meta.env);

export const DashboardPage = () => {

    const { user } = useOutletContext<OutletContext>();
    const {isCreator, createdId, challengeId} = user;

    if(challengeId) {
        return (
            <Challenge user={user} challengeId={challengeId} />
        )
    }

    // TODO - add in when user can create challenge
    // if(isCreator){
    //     if(!createdId) {
    //         return <CreateChallenge user={user}/>
    //     }
    // }
    
    return (
        <p>
            Oh no, somethings gone wrong
        </p>
    )
}