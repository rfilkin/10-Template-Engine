const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function get_Manager_officeNum(){
    //prompts user to enter a Manager object's officeNum

    return inquirer.prompt([
        {
            type: "input",
            name: "officeNum",
            message: `what is the Manager's office number?`
        }
    ])
}

async function get_Engineer_Github(){
    //prompts user to enter an Engineer object's github

    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: `what is the Engineer's github?`
        }
    ])
}

async function get_Intern_school(){
    //prompts user to enter an Intern object's school

    return inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: `what is the Intern's school?`
        }
    ])
}

async function get_Employee_data(role){
    //prompts user for general employee data

    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: `what is the ${role}'s name?`
        },
        {
            type: "input",
            name: "id",
            message: `what is the ${role}'s id?`
        },
        {
            type: "input",
            name: "email",
            message: `what is the ${role}'s email?`
        }
    ]);
}

async function add_role_data(role){
    //prompts user for additional data unique to child classes

    switch (role){
        case "Manager":
            var role_data = await get_Manager_officeNum();
            return role_data;
        case "Engineer":
            var role_data = await get_Engineer_Github();
            return role_data;
        case "Intern":
            var role_data = await get_Intern_school();
            return role_data;
    }
}

function proceed_prompt(){
    //prompts user with a yes/no question about whether to continue adding employees

    return inquirer.prompt([
        {
            type: "list",
            name: "proceed",
            message: "add another employee?",
            choices: [
                "yes",
                "no"
            ]
        }
    ]);
}

function select_employee_role(){
    //prompts user to select the employee role (engineer or intern) that they want to add.

    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "which employee role should be added?",
            choices: [
                "Engineer",
                "Intern"
            ]
        }
    ]);
}

async function add_Employee(role){
    var data = await get_Employee_data(role); //prompt user for generic employee data about the new object.
    var role_data = await add_role_data(role); //prompt user for role-specific data about the new object

    switch (role){
        case "Manager":
            var new_Employee = new Manager(data.name, data.id, data.email, role_data.officeNum);
            Employees.push(new_Employee);
            return new_Employee;
        case "Engineer":
            var new_Employee = new Engineer(data.name, data.id, data.email, role_data.github);
            Employees.push(new_Employee);
            return new_Employee;
        case "Intern":
            var new_Employee = new Intern(data.name, data.id, data.email, role_data.school);
            Employees.push(new_Employee);
            return new_Employee;
    }
}

const Employees = []; //this list will hold all employee objects that we create.

async function init(){

    //first, prompt the user for manager data, since the team needs one.
    await add_Employee("Manager");

    var done = false;
    while (!done){ //loop until user finishes adding all employees they want
        const proceed_data = await proceed_prompt(); //ask user if they want to continue

        if (proceed_data.proceed == "yes"){ //if user wants to continue, proceed
            const role_data = await select_employee_role(); //ask user what role of employee they want
            await add_Employee(role_data.role); //prompt user for info about the selected employee role
        }
        else{ //if user doesn't want to continue, stop.
            done = true;
            break;
        }
    }
    console.log(Employees);

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!

    var templated_html = render(Employees);
    //console.log(templated_html);

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.
    const writeFileAsync = util.promisify(fs.writeFile);
    return writeFileAsync("./output/team.html", templated_html);
}

init(); //calls our initializer function to start looping user prompts

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```