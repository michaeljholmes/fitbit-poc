import { FitbitDetails } from "../api.types";
import { getFitbitAuthURL } from "./endpoints";

export const getFitbitDetails = async (userId: string): Promise<FitbitDetails> => {
    const details = await fetch(getFitbitAuthURL(userId), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    return await details.json();
};