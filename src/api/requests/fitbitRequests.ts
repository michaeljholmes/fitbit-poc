import { api } from "..";
import { FitbitDetails } from "../api.types";

export const getFitbitDetails = async (): Promise<FitbitDetails> => {
    const isProdMode = import.meta.env.MODE === "production";
    const details = await fetch(`${api}/${isProdMode ? "fitbitDetailsProd" : "fitbitDetails"}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    return await details.json();
};