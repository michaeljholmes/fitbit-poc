import { Competition } from "./Competition";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../routing/Template";
import { useAuth0 } from "@auth0/auth0-react";
import { useAsync } from "react-use";

export const DashboardPage = () => {

    const { user } = useOutletContext<OutletContext>();
    // const {competitionId} = user;
    const competitionId = "649a7f3f-8234-4f73-86b0-a4a4fcd47fd9";

    const {
        isAuthenticated,
        getAccessTokenSilently
      } = useAuth0();

      console.log(isAuthenticated);

    useAsync(async () => {
        try {
          if (isAuthenticated) {  
            const token = await getAccessTokenSilently();
            console.log(token);
        
            const response = await fetch(`https://www.stridewars.com/api/health`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
        
            const responseData = await response.json();
            console.log(responseData);
            }

        } catch (error) {
            console.log("ERROR")
        }
      }, [getAccessTokenSilently, isAuthenticated]);

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