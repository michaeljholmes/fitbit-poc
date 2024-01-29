import { api } from "..";
import { User } from "../api.types";

export const getUserById = async (userId: string): Promise<User> => {
    const user = await fetch(`${api}/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    return await user.json();
};
