const isProduction = import.meta.env.MODE === "production";
// Get competition by ID
export const getCompetitionEndpoint = (competitionId: string) => 
    isProduction ? `${import.meta.env.VITE_API}/api/competition/${competitionId}` :
    `${import.meta.env.VITE_API}/competitions/${competitionId}`;
// Get competition teams for given challenge
export const getCompetitionTeamsEndpoint = (competitionId: string) => 
    isProduction ? `${import.meta.env.VITE_API}/api/competition/teams/${competitionId}` :
    `${import.meta.env.VITE_API}/competitionTeams/${competitionId}`;  

// Get team members
export const getTeamMembersEndpoint = (teamId: string) => 
    isProduction ? `${import.meta.env.VITE_API}/api/team/${teamId}` :
    `${import.meta.env.VITE_API}/users`;    

// // Get team
// export const getTeamByIdEndpoint = (teamId: string) => 
//     isProduction ? `${import.meta.env.VITE_API}/api/team/${teamId}` :
//     `${import.meta.env.VITE_API}/users`;     
    
