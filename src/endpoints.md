## Authentication
TBD
## Competition
GET  - competition By Id - done
GET - competition members - done
GET - competition teams - done
Add - competition - done
PATCH - join competition - done

GET - join competition link - will need a like to join backend, can easily be /join-competition&competitionId="id" for now

## Fitbit
GET
Fitbit details (the clientId, codecompetition and generatedState)

## USER
GET - user by ID - done

PATCH - connect to fitbit
Pass in fitbit state and code to allow backend to call Fitbit API to get tokens
PATCH - disconnect to fitbit
Unregister current user from fitbit and delete tokens

## Teams
GET - Team by Id - done
PATCH - Team - done by patching challenge


