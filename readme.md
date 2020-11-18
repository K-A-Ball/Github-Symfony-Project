### Running the project

1. yarn install
2. composer install
3. yarn encore dev --watch
4. symfony server:start

### Functionality

1. User can search for any user and they will either:
    - Be shown the relevant user data in the table
    - Be notified that the user was not found.
2. Data is cached in state to prevent excessive api calls.
3. Difference between the time of data retrieval and the last time the user updated their profile is displayed.

### What went well
1. Handling of positive and negative cases - where the user is not found, and communicated to the user.
2. React handles the endpoints in a presentable way to the user, but they are still usable 'manually' (entering the /profiles/user) if you want to see just the response, allowing for flexibility.
3. All additional tasks covered, and I had a fun time doing these.

### What could be improved
1. Frontend code could be refactored further - the user data state can be removed completely and the data can be displayed to the user via the cached_user_data indexed by the username of the user. 
2. If I had more time, I would change the PHP code to not send over the entire response, but rather just the data from the response, as with large datasets this would impact efficiency of the application.
3. Design - I had ideas about mapping the cached data instead of just the current search into the table, and then using a ternary to decide the background colour of the row -- ie. if you search for data you've already searched for previously, it would become highlighted in the table. I think UX and UI is important and would have enjoyed doing this, but didn't want to stray too far away from the scope of the task.

I hope you enjoy looking at the project, and I look forward to hearing from you. Regardless of the outcome, I have very much enjoyed this task and learned some new things along the way - so thank you for that.

Kindest regards,
Kelly