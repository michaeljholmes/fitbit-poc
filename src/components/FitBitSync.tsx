import { Button, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useAsync } from "react-use";

const clientId = "23RNL8";
const codeVerifier =
  "0o3f2m1b406c462e1e4i6c31662v3q1z2516656t420w1p5g5b3l1e4g350t5x6u6g580t0x5q706q1g725s65190g2w65654p5n260t230k66563t4e706g3c2p2y6r";
const codeChallenge = "pQgSBsfD_S2HqKLsRolDFljd5ECIgerjRM9Izlkqv5w";
const generatedState = "442x6y58162d1q2l4h556j4q275t531q";

const authLink = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&scope=activity&
code_challenge=${codeChallenge}&code_challenge_method=S256&state=${generatedState}&redirect_uri=http%3A%2F%2Flocalhost%3A5173`;

// const fitbitUserId = "3MFVV8";

const getSteps = (userId: string, token: string) =>
  fetch(
    `https://api.fitbit.com//1/user/${userId}/activities/date/2023-12-29.json`,
    { method: "POST", headers: { Authorization: `Bearer ${token}` } },
  );

const formBody = (formObject: any) =>
  Object.keys(formObject)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(formObject[key]),
    )
    .join("&");

const authoriseFitbit = (code: string) =>
  fetch(`https://api.fitbit.com/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      code_verifier: codeVerifier,
      redirect_uri: "http://localhost:5173",
    }),
  });

export const FitbitSync = () => {
  const [searchParams] = useSearchParams();

  const steps = useAsync(async () => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (state !== generatedState) {
      return;
    }
    if (!code) return;
    try {
      const authResponse = await authoriseFitbit(code);
      const auth = await authResponse.json();
      console.log(auth);
      const response = await getSteps(auth.user_id, auth.access_token);
      const result = await response.json();
      // store tokens in browser

      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }, [searchParams]);

  if (steps.loading) {
    return <p>Loading....</p>;
  }

  console.log(steps);
  if (steps?.value) {
    return <Typography>Got steps! {steps.value.summary.steps}</Typography>;
  }

  return (
    <Button
      onClick={() => {
        window.location.href = authLink;
      }}
    >
      Auth with Fitbit
    </Button>
  );
};
