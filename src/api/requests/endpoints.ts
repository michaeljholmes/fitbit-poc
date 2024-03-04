const isProduction = true; //import.meta.env.MODE === "production";

// Get competition by ID
export const getCompetitionEndpoint = (competitionId: string) => 
    isProduction ? `${import.meta.env.VITE_API}/api/competition/${competitionId}` :
    `${import.meta.env.VITE_API}/competitions/${competitionId}`;

// Get competition teams for given competition
export const getCompetitionTeamsEndpoint = (competitionId: string) => 
    isProduction ? `${import.meta.env.VITE_API}/api/competition/${competitionId}/teams` :
    `${import.meta.env.VITE_API}/teams`;  

// Get competition members
export const getCompetitionMembersEndpoint = (competitionId: string) => 
    isProduction ? `${import.meta.env.VITE_API}/api/competition/${competitionId}/members` :
    `${import.meta.env.VITE_API}/users`;      

// Get team members
export const getTeamMembersEndpoint = (teamId: string) => 
    isProduction ? `${import.meta.env.VITE_API}/api/team/${teamId}` :
    `${import.meta.env.VITE_API}/teams/${teamId}`;    

// Get User by email
export const getUserByEmailEndpoint = (userId: string) => 
    isProduction ? `${import.meta.env.VITE_API}/api/user/${userId}` :
    `${import.meta.env.VITE_API}/users/${userId}`;
    
// Post User
export const postUserEndpoint = () => 
    isProduction ? `${import.meta.env.VITE_API}/api/user` :
    `${import.meta.env.VITE_API}/users`;
    
// Get Fitbit Signin URL
export const getFitbitAuthURL = (userId: string) =>     
    isProduction ? `${import.meta.env.VITE_API}/api/fitbit/authUrl/${userId}` :
    `URL`;

// Post Fitbit details
export const postFitbitAuthURL = () =>     
    isProduction ? `${import.meta.env.VITE_API}/api/fitbit/tokens` :
    `URL`;
