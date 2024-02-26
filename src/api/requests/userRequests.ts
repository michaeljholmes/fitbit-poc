import { api } from "..";
import { User } from "../api.types";
import { getUserByEmailEndpoint } from "./endpoints";

export const getUserByEmail = async (email: string): Promise<User> => {
    const user = await fetch(getUserByEmailEndpoint(email), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    return await user.json();
};

export const connectToFitbit = async (userId: string, state: string, code: string): Promise<User> => {
    const user = await fetch(`${api}/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            isFitbitIntegrated: true
        })
    });
    return await user.json();
};

export const disconnectToFitbit = async (userId: string): Promise<User> => {
    const user = await fetch(`${api}/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            isFitbitIntegrated: false
        })
    });
    return await user.json();
};
