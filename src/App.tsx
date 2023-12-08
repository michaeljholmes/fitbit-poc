import { Button, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useAsync } from "react-use";

const authLink = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23RNRL&scope=activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight&code_challenge=-xnq9mUFT4fouuBSJCoqYlx1me_vY7RLCTlgMl5W0-E&code_challenge_method=S256&state=1m694w1a2h665o3v4u273k28700r3e1u&redirect_uri=http%3A%2F%2Flocalhost%3A5173"

const fitbitUserId = '3MFVV8';

const getSteps = () => fetch(
    `https://api.fitbit.com//1/user/${fitbitUserId}/activities/date/2023-11-29.json`,
    {method: "POST", headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JOTDgiLCJzdWIiOiIzTUZWVjgiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IiwiZXhwIjoxNzAxNTA0MjIzLCJpYXQiOjE3MDE0NzU0MjN9.bhqpFCPbWnlg_pcXe-AqmSG_Hm9TvzKkHyDok5urJlI", }}
);

export const App = () => {

    let { code } = useParams();

    const steps = useAsync(async () => {
        try {
        const response = await getSteps();
        const result = await response.json();
        return result;
        } catch(e){
            console.log(e);
        }finally {
            return undefined;
        }
    }, [code]);

    if(steps?.value){
        return <Typography>Got steps! {steps.value.summary.steps}</Typography>
    }

    return (
        <Button onClick={() => {window.location.href = authLink}}>Auth with Fitbit</Button>
    )
}