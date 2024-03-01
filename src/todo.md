IMVP
 - When is the competition actually created? We'll start by fixing start time.
 - Is the creator in the competition? Do we need toggle?
 - Need to show what happens at the end!

Post IMVP
- Tidy up create competition form validation

Thoughts
 - Should we show the teams with the countdown?
 - Prevent user from manually creating team, AND then trying to send out a link. This could be done by using a button to generate a link.
 - Enforce google sign in only?

TODO
Trial authenticated endpoint and plug in
Sign user up on verification page


Still getting CORS issue using http://162.0.223.239:9999/
When posting a user, we can only use email (remove username, will add this later)
I need the return URL to be /dashboard/tracker
Can GET api/fitbit/authURL please come back as JSON
Can swagger please have response types?
We need an endpoint to diconnect from fitbit

I've decided to fully switch over to the live API as trying to match up the JSON server behaviour with the backend it tricky.

Next - fix verification, and loggedIn checks to hooks, tidy up hooks, make look a little nicer