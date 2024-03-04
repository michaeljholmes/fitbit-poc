import { api } from "..";
import { User } from "../api.types";
import { getUserByEmailEndpoint, postUserEndpoint } from "./endpoints";

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

export const postUser = async (email: string): Promise<User> => {
    const newUser = await fetch(postUserEndpoint(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            userName: "test2"
        })
    });
    return await newUser.json();
}

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
