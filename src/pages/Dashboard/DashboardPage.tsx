import { Competition } from "./Competition";
import { CreateCompetition } from "./CreateCompetition";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../routing/Template";
import { Stack } from "@mui/material";

console.log(import.meta.env);

export const DashboardPage = () => {

    const { user } = useOutletContext<OutletContext>();
    const {isCreator, createdId, competitionId} = user;

    if(competitionId) {
        return (
            <Competition user={user} competitionId={competitionId} />
        )
    }

    // TODO - add in when user can create competition
    // if(isCreator){
    //     if(!createdId) {
    //         return <CreateCompetition user={user}/>
    //     }
    // }
    
    return (
        <p>
            Oh no, somethings gone wrong
        </p>
    )
}