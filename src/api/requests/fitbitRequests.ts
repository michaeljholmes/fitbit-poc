import { FitbitDetails } from "../api.types";

export const getFitbitDetails = async (): Promise<FitbitDetails> => {
    const isProdMode = import.meta.env.MODE === "production";
    // const details = await fetch(`${api}/${isProdMode ? "fitbitDetailsProd" : "fitbitDetails"}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     credentials: "include"
    // });
    // return await details.json();
    return !isProdMode ? {
        clientId: "23RNL8",
        codeChallenge: "pQgSBsfD_S2HqKLsRolDFljd5ECIgerjRM9Izlkqv5w",
        generatedState: "442x6y58162d1q2l4h556j4q275t531q"
      }:
      {
        clientId: "23RVBM",
        codeChallenge: "cKq-NsUtGev5Ib-osU9HOgmTM10fuaWNeiBKUI2aEfQ",
        generatedState: "0a0w5e5p2q5c5j4s0m0f4q591n266o2y"
      };
};