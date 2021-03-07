//add dependancies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const { connect } = require('http2');



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
        .then(({ answer }) => {
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
};
//define more actions
const moreActions = () => {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Interested in any other actions?',
        name: 'moreActions',
        default: false
    }]).then(({ moreActions }) => {
        if (moreActions) {
            return promptUser()
        } connection.end()
    })
}

//define function for view all departments
const viewAllDepts = () => {
    const query = connection.query('SELECT * FROM department', (err, res) => {
        if (err) {
            throw err;
        }
        //display table
        console.log('\n');
        console.table(res);
        console.log('---------------------------------------')
        //return to options
        moreActions();
    });
};

//define function for view all roles
const viewAllRoles = () => {
    console.log('view all roles');
    const query = connection.query('SELECT roles.id, roles.title, roles.salary, department.name as department_name FROM roles LEFT JOIN department on roles.department_id = department.id;', (err, res) => {
        if (err) {
            throw err;
        }
        //display table
        console.table(res);
        console.log('---------------------------------------')

        //return to options
        return moreActions();
    });
};

//define function for view all employees
const viewAllEmployees = () => {
    console.log('view all employees');
    const query = connection.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title as job_title, roles.salary, department.name as deparment, employee.manager_id FROM employee LEFT JOIN roles on employee.role_id = roles.id INNER JOIN department on roles.department_id = department.id', (err, res) => {
        if (err) {
            throw err;
        } console.table(res)
        console.log('---------------------------------------')
        moreActions();
    });
};

//define function to add a departmnt
const addDept = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Please enter a department to add'
    },
    ]).then((answer) => {
        // console.log('creating new department');
        console.log(answer.name);
        connection.query(
            'INSERT INTO department SET ?',
            { name: answer.name },
            function (err, res) {
                if (err) {
                    throw err
                }
                console.table(res);
                moreActions();
            }
        )

    })
};

//define function to add a role
const addRole = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;

        let departmentChoices = res.map(department => ({
            name: department.name, value: department.id
        }));
        //ask question
        inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'Please enter a role you want to add'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary'
        },
        {
            type: 'list',
            name: 'department',
            choices: departmentChoices,
            message: 'Please enter the department for the role you just created'
        }
        ]).then((answer) => {
            console.log(answer.title)
            connection.query(
                'INSERT INTO roles SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
                },
                function (err, res) {
                    if (err) {
                        throw err
                    }
                    console.table(res);
                    moreActions();
                }
            )
        })
    })
};

//define function to add an employee (fyi, doesn't include manager name)
const addEmp = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;

        let roleList = res.map(roles => ({
            name: roles.title, value: roles.id
        }));
        //ask question
        inquirer.prompt([{
            type: 'input',
            name: 'first_name',
            message: 'Please enter the first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the last name'
        },
        {
            type: 'list',
            name: 'role',
            choices: roleList,
            message: 'Please enter a job title'
        }
        ]).then()
            .then((answer) => {
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role
                    },
                    function (err, res) {
                        if (err) {
                            throw err
                        }
                        console.table(res);
                        moreActions();
                    }
                )
            })
    });
};

//define function to update an employee
const updateEmp = () => {
    connection.query(
        'SELECT CONCAT(employee.first_name, " ",employee.last_name) AS full_name, employee.id as empl_id, roles.* FROM employee RIGHT JOIN roles on employee.role_id = roles.id',
        function (err, res) {
            if (err) throw err;

            let employeeList = res.map(employee => ({
                full_name: employee.full_name,
                id:employee.empl_id,
                value:[employee.full_name, employee.empl_id]
            }))
            let roleList = res.map (roles => ({
                title: roles.title,
                id: roles.id,
                value:[roles.title,roles.id]
            }));
            console.log(employeeList)
            inquirer.prompt([{
                type:'list',
                name:'employee',
                choices:employeeList,
                message:'Which employee would you like to edit?'
            },
            {
            type:'list',
            name:'newRole',
            choices:roleList,
            message:'What role do you want to assign?'
        }
        ])
            .then((answer) => {
              let editID = answer.employee[1];
              let newRoleId = answer.newRole[1];
              console.log(editID);
              console.log(newRoleId);
              console.log(answer);
              connection.query(`UPDATE employee SET role_id=${newRoleId} WHERE id=${editID};`,
              function(err, res) {
                  if(err){
                      throw err
                  }
                  console.table(res)
                  moreActions();
              } )
            }

        
        )
    })
};


// //BONUS define function to update an employee
// const viewManager = () => {
//     console.log('viewing manager')
// };

// //BONUS define function to view employee by department
// const empByDept = () => {
//     console.log('view employees by department')
// };

// BONUS define function to delete an employee
const deleteEmp = () => {
    connection.query('SELECT CONCAT(first_name, " ", last_name) as full_name, id FROM employee', function (err, res) {
        if (err) throw err;

        let employeeList = res.map(employee => ({
            full_name: employee.full_name,
            id: employee.id,
            value: [employee.full_name, employee.id]
        }));
        inquirer.prompt([{
            type: 'list',
            name: 'employee',
            choices: employeeList,
            message: 'Please select the employee you want to delete'
        }
        ])
            .then((answer) => {
                console.log(answer.employee[1]);
                deleteID = answer.employee[1];
                console.log(deleteID)
                connection.query(`DELETE FROM employee WHERE id = ${deleteID};`,
                    function (err, res) {
                        if (err) {
                            throw err
                        }
                        console.table(res);
                        moreActions();
                    })

            }
            );
    });
};

// //BONUS define function to delete department
// const deleteDept = () => {
//     console.log('delete a departmnet')
// };

// //BONUS define function to delete a role
// const deleteRole = () => {
//     console.log('delete a role')
// };