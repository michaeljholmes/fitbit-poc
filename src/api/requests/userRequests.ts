import { api } from "..";
import { User } from "../api.types";
import { deleteFitbitTokens, getUserByEmailEndpoint, postFitbitAuthURL, postUserEndpoint } from "./endpoints";

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
        const user = await fetch(getUserByEmailEndpoint(email), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        return await user.json();
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

export const postUser = async (email: string): Promise<User | undefined> => {
    try {
        const newUser = await fetch(postUserEndpoint(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                emailAddress: email
            })
        });
        return await newUser.json();
    } catch (e){
        console.log(e);
        return undefined
    }
}

export const connectToFitbit = async (userId: string, state: string, code: string): Promise<void> => {
    await fetch(postFitbitAuthURL(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            userId,
            code,
            state
        })
    });   
};

export const disconnectToFitbit = async (userId: string): Promise<void> => {
    await fetch(deleteFitbitTokens(userId), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });
};
