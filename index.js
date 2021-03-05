//add dependancies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


//define connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'sqlpassword',
    database: TBD
})

//create connection
connection, connect(err => {
    if (err) {
        throw err;
    }
    console.log('myEmployees connected as id ' + connection.threadId);
    TBD() //function to take me to inquierer? 
})
//define options presented upon starting application: THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
//BONUS: Update employee managers. View employees by manager.View employees by department. Delete departments, roles, and employees.
promptOptions =['View all deparments','View all roles', 'View all employees','Add a department', 'Add a role', 'Add an employee', 'Update an employee role']

//define inquirer function 
const promptUser = () => {
    return inquirer
        .prompt([
            /* Pass your questions in here */
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
};
promptUser();

