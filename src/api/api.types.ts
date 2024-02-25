export interface User {
    id: string,
    email: string,
    username: string,
    competitionId?: string;
    isFitbitIntegrated?: boolean;
  }

  export interface Competition {
    id: string;
    name: string;
    owner: User;
    startTime: string;
  }

  export interface Team {
    id: string;
    username: string;
    position: number,
    users: User[]
  }

  export interface FitbitDetails {
    clientId: string;
    codeChallenge: string;
    generatedState: string;
}