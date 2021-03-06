//add dependancies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const promisemysql = require("promise-mysql");



//define connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sqlpassword',
    database: 'employees_db'
});

//create connection
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('myEmployees connected as id ' + connection.threadId);
    promptUser() //function to take me to inquierer? 
})
//define options presented upon starting application: THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
//BONUS: Update employee managers. View employees by manager.View employees by department. Delete departments, roles, and employees.
actions = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Delete employee']

//define inquirer function 
const promptUser = () => {
    return inquirer
        .prompt(
            [
                {
                    type: 'list',
                    name: 'answer',
                    message: 'Please select an action',
                    choices: actions

                }
            ]
        )
        .then(({answer}) => {
            if (answer === actions[0]) {
                viewAllDepts();
            }
            if (answer === actions[1]) {
                viewAllRoles();
            }
            if (answer === actions[2]) {
                viewAllEmployees();
            }
            if (answer === actions[3]) {
                addDept();
            }
            if (answer === actions[4]) {
                addRole();
            }
            if (answer === actions[5]) {
                addEmp();
            }
            if (answer === actions[6]) {
                updateEmp();
            }
            if (answer === actions[7]) {
                deleteEmp();
            }
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
};
// promptUser();

//define function for view all departments
const viewAllDepts = () => {
    const query = connection.query('SELECT * FROM department', (err, res) => {
        if (err) {
            throw err;
        }
        //display table
        console.log('\n');
        console.table(res);
        //return to options
        promptUser()
      
    });
};

//define function for view all roles
const viewAllRoles = () => {
    console.log('view all roles');
    const query = connection.query('SELECT * FROM roles', (err, res) => {
        if (err) {
            throw err;
        }
        //display table
        console.table(res);
        //return to options
        promptUser()

    });

};

//define function for view all employees
const viewAllEmployees = () => {
    console.log('view all employees');
    const query = connection.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            throw err;
        } console.log(res)
    });
    //return to options
    // promptUser()
};

//define function to add a departmnt
const addDept = () => {
    console.log('creating new department');
    const query = connection.query(
        'INSERT INTO departments SET ?',
    )
};

//define function to add a role
const addRole = () => {
    console.log('adding new role')
};

//define function to add an employee
const addEmp = () => {
    console.log('adding new employee')
};

//define function to update an employee
const updateEmp = () => {
    console.log('updating employee')
};


//define function to update an employee
const viewManager = () => {
    console.log('viewing manager')
};

//define function to view employee by department
const empByDept = () => {
    console.log('view employees by department')
};

//define function to delete an employee
const deleteEmp = () => {
    console.log('deleting employee')
};

//define function to delete department
const deleteDept = () => {
    console.log('delete a departmnet')
};

//define function to delete a role
const deleteRole = () => {
    console.log('delete a role')
};