export interface User {
    userId: string,
    email: string,
    username: string,
    competitionId?: string;
    isFitbitIntegrated?: boolean;
    steps: number;
  }

  export interface Competition {
    id: string;
    competitionName: string;
    owner: User;
    startTime: string;
  }

  export interface Team {
    teamId: string;
    rank: number;
    teamName: string;
    username: string;
    position: number,
    users: User[]
  }

  export interface FitbitDetails {
    clientId: string;
    codeChallenge: string;
    generatedState: string;
}