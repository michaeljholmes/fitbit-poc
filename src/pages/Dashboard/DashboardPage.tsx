import { Competition } from "./Competition";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../routing/Template";

export const DashboardPage = () => {

    const { user } = useOutletContext<OutletContext>();
    const {competitionId} = user;

    if(competitionId) {
        return (
            <Competition user={user} competitionId={competitionId} />
        )
    }
    
    return (
        <p>
            Oh no, somethings gone wrong
        </p>
    )
}