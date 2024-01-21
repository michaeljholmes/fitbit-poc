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
  }

  export interface Team {
    id: string;
    name: string;
    position: 1,
    users: string[]
  }