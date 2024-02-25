export interface User {
    id: string,
    email: string,
    name: string,
    isCreator: boolean,
    createdId?: string,
    competitionId?: string;
    isFitbitIntegrated: boolean;
  }

  export interface Competition {
    id: string;
    name: string;
    creator: string;
    // teams: Team[];
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