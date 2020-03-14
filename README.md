# 10-Template-Engine
This is an app that allows the user to create and display html templates with details of employees.

# Installation
1. Clone this repository to your local machine.
2. Navigate to the repository directory and start up git bash.
3. Run the command "npm install" to install all necessary packages.

# Usage
1. Navigate to the repository directory and start up git bash.
2. Run the command "node app.js" in git bash to start up the app.
3. You will be asked a series of questions for the employee details, starting with the details of the manager.
4. After the manager details are entered, the app will ask if you want to add more employees. This will repeat to allow you to enter data for as many employees as you like.
5. After you've added all the employees you want, select "no" at the "add another employee?" prompt to exit the questions section.
6. The app will print the current list of employees to the console.
7. The app will also export a formatted html file with all the employee data, as "team.html". This will be located in the "output" folder.