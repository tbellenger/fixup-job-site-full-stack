# FixUp <a name="fixup"></a>

The Github link [tbellenger/coding-bc-project-2](https://github.com/tbellenger/coding-bc-project-2)

View the page on Heroku [FixUP.com](https://fixup-job.herokuapp.com/jobs)

FixUp is a full stack web application where a user can create an account, post jobs, apply to jobs, and rate jobs.

# Table of contents

- [FixUp](#fixup)
- [The project requirements](#requirements)
- [The development process](#process)
- [User Story](#user-story)
- [Installation and Usage](#usage)
- [Tools and Software](#tools)
- [Questions](#questions)

# The project requirements <a name="requirements"></a>

Create a Full Stack Web Application with the following items:

- Use Node.js and Express.js to create a RESTful API.
- Use a template engine such as Handlebars.js.
- Use MySQL and the Sequelize ORM for the database.
- Have both GET and POST routes for retrieving and adding new data.
- Deploy using Heroku (with data).
- Use at least one new library, package, or technology that we haven't discussed.
- Have a polished UI.
- Be responsive.
- Be interactive (i.e., accept and respond to user input).
- Must have a folder structure that meets the MVC paradigm.
- Must include authentication (cookies and express-session).
- Must protect API keys and sensitive information with environment variables.
- Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).
- Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

# The development process<a name="process"></a>

1. Brainstorm Ideas and defined our projects main purpose and user
2. WireFrame
3. Discussed steps and assigned them between meetings
4. Created initial files, and working branches
5. Created rountes, requests, and response structure
6. Connected front and backend
7. Add more useful features or functionalities
8. Polishing and finalizing the User Interface
9. Refactoring the code
10. Deployed to Heroku

# User Story<a name="user-story"></a>

As a one time job seeker or employer I want a job posting website where I can post jobs and apply for them,  
like jobs and rate other job seekers or employers  
GIVEN a job posting website  
WHEN I visit the website for the first time  
THEN I am presented with a homepage with links to individual job categories and a link to view all open jobs,
a search bar to lookup a job by location, title or description, and links to login, go to dashboard or homepage.  
WHEN I click on the login link  
THEN I am taken to a page where I can login or signup instead  
WHEN I click on the All jobs link  
THEN I am able to see all listed open jobs with the date they were posted, titles, descriptions, payment method and amount, a job image, zip code of the job and the name of the employer with a link to their user profile page, and buttons to like or apply for a job and the number of likes the listing has  
WHEN I click on particular category  
THEN I am able to see all listed open jobs specific to that category with the date they were posted, titles, descriptions, payment method and amount, a job image, zip code of the job and the name of the employer with a link to their user profile page, and buttons to like or apply for a job and the number of likes the listing has  
WHEN I click on the like button  
THEN I am able to like each job once and the likes count updates to include my like  
WHEN I click on a job listing  
THEN I am redirected to a page where I can see the job title, posted date, description, payment method and amount, a job image, zip code of the job, the name of the employer, and buttons to like or apply for a job and the number of likes the listing has, and I am able to comment and read others' comments on that job listing  
WHEN I make a comment for a job  
THEN I am later able to edit or delete the comment  
WHEN I click on the user link  
THEN I am taken to the user page with their name, rating, last login, and am able to rate them and send them direct messages that only them can see  
WHEN I rate a user
THEN their rating changes based on the score I gave him  
WHEN I go to my dashboard  
THEN I get a notification of the direct messages that I received with the name of the user from whom I received it, a form to open a job listing, a table that shows the jobs that I opened, a table that shows the jobs that I applied to, one for the jobs I was selected for and one for the jobs I completed  
WHEN I click on the direct messages notification bar  
THEN I am taken to the user page that sent me the message and able to reply back and see a history of messages with the local time they were sent  
WHEN I want to open a job listing  
THEN I am able to fill in the title, select a category from a dropdown menu, fill in the job description, payment method and amount, job location and optionally upload an image of the job  
WHEN I fill in all the required fields and click the sumbit button  
THEN my job posting shows on the all jobs page and on the page of the corresponding category  
WHEN I go to my posted jobs table  
THEN I can see the title of the job, a link to applicants of the job, job status and buttons to edit, delete or mark the job complete  
WHEN I click the link to the applicants  
THEN I am taken to a page with a list of the pool of applicants with their names and emails  
WHEN I click an applicant name or email  
THEN I am taken to the applicant user page or am able to email the applicant  
WHEN I select an applicant  
THEN the job status changes from open to filled and the applicant gets an automatic email from the website notifying them that they have been selected for a job  
WHEN I click on edit, delete a job in my dahsboard  
THEN I am taken to a page where I am able to edit the job, or the jobs gets deleted  
WHEN I click the mark complete button  
THEN the job status changes from filled to complete and I am presented with a popup to rate the employee  
WHEN I go to the dashboard  
THEN I am able to see the titles of the jobs I have applied to, been selected for and completed with the name of their owner and status

# Installation and Usage<a name="usage"></a>

snaphot

<img width="1748" alt="Screen Shot 2022-01-01 at 8 21 06 PM" src="https://user-images.githubusercontent.com/65073138/147866156-6bd43f7c-6c26-4d57-92d7-03eb5c469d3a.png">
<img width="1781" alt="Screen Shot 2022-01-02 at 2 15 03 PM" src="https://user-images.githubusercontent.com/65073138/147894025-4a2b79df-1d96-46cf-a3e1-26537c10b330.png">

The project was uploaded to GitHub at the following repository:  
[tbellenger/coding-bc-project-2](https://github.com/tbellenger/coding-bc-project-2)  
You can access the deployed application with the Heroku link:  
[FixUP.com](https://fixup-job.herokuapp.com/jobs)

To install the project follow these steps:

Clone the application from GitHub with:
git clone git@github.com:tbellenger/fixup-job-site-full-stack.git

From the root folder, install the dependencies with:
npm install

Run the app with:
node server.js

# Tools and software <a name="tools"></a>

NODE.Js packages(bcrypt, passport-jwt, sequelize, jsonwebtoken, nodemailer)  
Heroku, Github  
Express.JS, MySQL, Sequelize ORM  
BULMA /CSS frameworks  
Handlebars  
AWS

# Questions<a name="questions"></a>

If you have questions or you want to share comments, we will be glad to hear from you. Please contact us at  
Tom Bellenger's github: https://github.com/tbellenger  
Alma Braun's github: https://github.com/ALMA-DEV914  
Kate Hamilton' s github: https://github.com/Katehamilton1  
Tarek Youssef' s github: https://github.com/tarekyou
