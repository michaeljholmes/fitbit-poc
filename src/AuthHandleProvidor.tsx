import { Auth0Provider, useAuth0, User } from "@auth0/auth0-react"
import { useEventCallback } from "@mui/material";
import { PropsWithChildren } from "react";
import { postUser } from "./api/requests/userRequests";
import { useNavigate } from "react-router";

export const AuthHandleProvidor = ({children}: PropsWithChildren) => {

  const navigate = useNavigate();
  
  const onRedirectCallback = useEventCallback(async (appState?: any, user?: User) => {
    const {isNewUser, competitionId} = appState;
    if(Boolean(isNewUser) && competitionId && user?.email){
      const newUser = await postUser(user?.email);
      console.log(newUser);
      if(!newUser){
        navigate("/error");
      }
    }
    navigate("/dashboard");
  });

    return (
    <Auth0Provider
      domain="dev-yxk3603z484r631r.us.auth0.com"
      clientId="lhoExBR8df0K1DkXrp05t062fEzyZ2gV"
      authorizationParams={{
        redirect_uri: `${import.meta.env.VITE_URL}/dashboard`
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"  
      onRedirectCallback={onRedirectCallback}
  >
    {children}
  </Auth0Provider>
);
  
}