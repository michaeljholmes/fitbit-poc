import { atom } from "recoil";

interface LoggedInState {
    isLoggedIn: boolean | undefined;
    userEmail?: string;
}

export const loggedInState = atom<LoggedInState>({
    key: 'LoggedInState',
    default: {
        isLoggedIn: undefined
    }
});