# Tuber

This is the developer documentation for the Tuber application, which allows users to save their favorite YouTube videos with additional useful information. The developer used the Atom text-editing platform, along with git and other software to write and test the code. The developer wrote the client facing code using HTML, SCSS (CSS), React and JavaScript (the API was written using Express.js).

### Github Repository Links
The Github repositories for this project are located here:

[Application Client](https://github.com/carlojacob/tuber)

[Application API](https://github.com/carlojacob/tuber-api)

### Deployed Sites
The deployed sites for this project are located here:

[Tuber Client](https://carlojacob.github.io/tuber)

[Tuber API](https://tuber-ccj.herokuapp.com/)

### What is Tuber
**Noun: Avid YouTube user** | *NOT a potato*
Tuber was developed with the avid *tuber* as the first priority. A *tuber* can use this application to save information about his/her favorite YouTube videos, all in one easy-to-access and easily manipulated website.

*Tubers* can custom save the artist's name, title, album, a description and the URL for their favorite video. Any correctly entered "YouTube format" URL allows that video to played directly on the application, and incorrectly entered URLs lead to a pleasant surprise.

### Screenshot
![Tuber Screenshot](https://i.imgur.com/exjZfTi.png)

### Wireframes
Initial wireframes images:
![Homepage](https://i.imgur.com/LOiXLnJ.jpg "Wireframe Homepage")

![Signed In Page](https://i.imgur.com/8KW5UoB.jpg "Wireframe Signed In Page")

![View/Show Page](https://i.imgur.com/HAlIvMU.jpg "Wireframe View/Show Page")

![Add/Create Page](https://i.imgur.com/8ETQIAy.jpg "Wireframe Add/Create Page")

![Edit/Update Page](https://i.imgur.com/XNktxI1.jpg "Wireframe Edit/Update Page")

### User Stories
Tuber user stories:
1. As a first-time user, I want to create an account.
2. As a user, I want to sign in.
3. As a user, I want to change my password.
4. As a user, I want to sign out.
5. As a returning user, I want to see a listing of all of my previously saved videos.
6. As a user, I want to see details of or watch one of my previously saved videos.
7. As a user, I want to create new videos.
8. As a user, I want to update previously saved videos.
9. As a user, I want to delete previously saved videos.
10. As a user, I want to select whether videos autoplay on `show` (stretch).
11. As a user, I want to select whether videos loop in `show` window (stretch).
12. As a user, I want to sort videos by fields in `index` window (stretch).
13. As a user, I want to search fields for strings in `index` window (stretch).
14. As a user, I want to select "favorite" videos (stretch).

### Entity Relationship Diagram
![Entity Relationship Diagram](https://i.imgur.com/rNElxUn.jpg "Entity Relationship Diagram")

### Resource Tables
![Resource Tables](https://i.imgur.com/Ytmx9vV.jpg "Resource Tables")

### Technologies Used
The following technologies were used to develop this application:
1. HTML5.
2. SCSS.
3. Bootstrap.
4. JavaScript.
5. Express.js
6. Node.js
7. MongoDB
8. Mongoose
9. Atom.
10. Git.
11. Github.
12. Heroku.
13. npm.
14. Curl.
15. AJAX.

### Development Process and Problem-Solving
Development for this application started by building an initial project scope, which was modified as necessary during development:
1. Developed application idea, and determined diagrammed ERDs for successful creation.
2. Scaffolded database tables for API.
3. Developed wireframes for desired user interface.
4. Made considerations for how various in-app screens would be displayed.
5. Placed heavy emphasis on meeting minimum viable product first. Initially applied minimal SCSS to ensure that the user experience met requirements, and additional styling was added near completion as time permitted.
6. Placed heavy emphasis on performing new tasks in new branches and making regular commits. Branch names explain what changes were made on that branch, and often include just one commit.

### Set up and installation instructions for application

Users who wish to download and improve upon this application may fork and clone from the public Github client repository [here](https://github.com/carlojacob/tuber) and the public API repository [here](https://github.com/carlojacob/tuber-api).

After forking and cloning the client repository, continue personalizing your set up by following the **Installation** steps provided [here](https://git.generalassemb.ly/ga-wdi-boston/react-auth-template), beginning at `6. Replace the "homepage" field in package.json with your (public) Github account name and repository name.`.

After forking and cloning the API repository, continue personalizing your set up by following the **Installation** steps provided [here](https://git.generalassemb.ly/ga-wdi-boston/express-api-template#installation), beginning at `7. Install dependencies with npm install.`.

Alternatively, you may choose to initialize your own repository by starting at step `1.` of either list of **Installation** steps.

### Improvements/Unsolved Problems
The following improvements could be made:
1. Improvements to interface for more user-friendly experience.
2. Modals for user inputs.
3. Button, input, other UI improvements on show, create and edit pages.
4. Video categories/custom fields.
5. Responsive design.
6. Help documentation.
7. Create user profiles to enhance/personalize each user's experience, and to enable interaction between user accounts (eg. view another user's favorite videos and add to their own favorites).
8. Sorting saved videos by field.
9. User settings for "autoplay" and "loop".
10. Search bar to find by any saved info.
11. Personal video rating scale (1-10).
12. Provide additional pseudocode for understanding what is being done.
13. Integrate YouTube API for additional functionality.
