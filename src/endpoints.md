## Authentication
TBD
## Challenge
GET 
challenge By Id
GET 
challenge members
GET
challenge teams
PATCH
join challenge
GET
join challnge link - will need a like to join backend, can easily be /join-challenge&challengeId="id" for now
## Fitbit
GET
Fitbit details (the clientId, codeChallenge and generatedState)
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


