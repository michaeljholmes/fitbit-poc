## Authentication
TBD
## Competition
GET 
competition By Id
GET 
competition members
GET
competition teams
PATCH
join competition
GET
join competition link - will need a like to join backend, can easily be /join-competition&competitionId="id" for now
## Fitbit
GET
Fitbit details (the clientId, codeCompetition and generatedState)
## USER
GET
user by ID
PATCH - connect to fitbit
Pass in fitbit state and code to allow backend to call Fitbit API to get tokens
PATCH - disconnect to fitbit
Unregister current user from fitbit and delete tokens
## Teams
GET
Team by Id
PATCH


