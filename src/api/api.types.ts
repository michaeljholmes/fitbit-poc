export interface User {
    id: string,
    email: string,
    name: string,
    isCreator: boolean,
    createdId?: string,
    participantId?: string;
    isFitbitIntegrated: boolean;
  }

  export interface Challenge {
    id: string;
    name: string;
    creator: string;
    users: string[];
    startTime: string;
  }

  export interface Team {
    id: string;
    name: string;
    position: number,
    users: string[]
  }

  export interface FitbitDetails {
    clientId: string;
    codeChallenge: string;
    generatedState: string;
}