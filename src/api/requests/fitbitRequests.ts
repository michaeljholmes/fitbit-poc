import { api } from "..";
import { FitbitDetails } from "../api.types";

export const getFitbitDetails = async (): Promise<FitbitDetails> => {
    const details = await fetch(`${api}/fitbitDetails`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    return await details.json();
};