import { api } from "..";
import { Challenge } from "../api.types";

// These fetches have been modified to work with the mock server I have
export const fetchChallenge = async (challengeId: string):Promise<Challenge> => {
    const challenge = await fetch(
      `${api}/challenges/${challengeId}`,
    );
    return challenge.json();
  }