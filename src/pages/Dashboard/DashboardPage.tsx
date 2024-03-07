import { Competition } from "./Competition";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../routing/Template";

export const DashboardPage = () => {

    const { user } = useOutletContext<OutletContext>();
    // const {competitionId} = user;
    const competitionId = "649a7f3f-8234-4f73-86b0-a4a4fcd47fd9";

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