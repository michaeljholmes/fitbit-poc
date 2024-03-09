import { useNavigate, useSearchParams } from "react-router-dom";
import { useAsync } from "react-use";
import { LoadingContainer } from "../components/LoadingContainer"

export const HandleFitbitAuth = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useAsync(async () => {
            const code = searchParams.get("code");
            const state = searchParams.get("state");
            console.log(code, state)
            if (!state) return;
            if (!code) return;
            try {
                searchParams.delete('code');
                searchParams.delete('state');
                setSearchParams(searchParams);
                const params = new URLSearchParams({
                    fitbitCode: code,
                    fitbitState: state
                });
                navigate({pathname: "/dashboard/tracker", search: params.toString()})
            } catch (e) {
                navigate("/")
                // Probably use toast notifications for errors
                // return undefined;
            }
        
    }, [searchParams]);

    return <LoadingContainer />;
}