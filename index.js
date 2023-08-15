const { prompt } = require("inquirer");
const db = require("./db");

init();

function init() {
  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        { name: "View All Employees", value: "VIEW_EMPLOYEES" },
        { name: "View All Employees By Department", value: "VIEW_EMPLOYEES_BY_DEPARTMENT" },
        { name: "View All Employees By Manager", value: "VIEW_EMPLOYEES_BY_MANAGER" },
        { name: "Add Employee", value: "ADD_EMPLOYEE" },
        { name: "Remove Employee", value: "REMOVE_EMPLOYEE" },
        { name: "Update Employee Role", value: "UPDATE_EMPLOYEE_ROLE" },
        { name: "Update Employee Manager", value: "UPDATE_EMPLOYEE_MANAGER" },
        { name: "View All Roles", value: "VIEW_ROLES" },
        { name: "Add Role", value: "ADD_ROLE" },
        { name: "Remove Role", value: "REMOVE_ROLE" },
        { name: "View All Departments", value: "VIEW_DEPARTMENTS" },
        { name: "Add Department", value: "ADD_DEPARTMENT" },
        { name: "Remove Department", value: "REMOVE_DEPARTMENT" },
        { name: "View Total Utilized Budget By Department", value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT" },
        { name: "Quit", value: "QUIT" }
      ]
    }
  ]).then(res => {
    switch (res.choice) {
      case "VIEW_EMPLOYEES": viewEmployees(); break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT": viewEmployeesByDepartment(); break;
      case "VIEW_EMPLOYEES_BY_MANAGER": viewEmployeesByManager(); break;
      case "ADD_EMPLOYEE": addEmployee(); break;
      case "REMOVE_EMPLOYEE": removeEmployee(); break;
      case "UPDATE_EMPLOYEE_ROLE": updateEmployeeRole(); break;
      case "UPDATE_EMPLOYEE_MANAGER": updateEmployeeManager(); break;
      case "VIEW_DEPARTMENTS": viewDepartments(); break;
      case "ADD_DEPARTMENT": addDepartment(); break;
      case "REMOVE_DEPARTMENT": removeDepartment(); break;
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT": viewUtilizedBudgetByDepartment(); break;
      case "VIEW_ROLES": viewRoles(); break;
      case "ADD_ROLE": addRole(); break;
      case "REMOVE_ROLE": removeRole(); break;
      default: quit();
    }
  });
}


// View all employees
function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => displayTable(rows))
    .then(loadMainPrompts);
}

// View employees by department
function viewEmployeesByDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      const departmentChoices = rows.map(({ id, name }) => ({ name, value: id }));
      return promptUser([{ type: "list", name: "departmentId", message: "Which department would you like to see employees for?", choices: departmentChoices }]);
    })
    .then(({ departmentId }) => db.findAllEmployeesByDepartment(departmentId))
    .then(([rows]) => displayTable(rows))
    .then(loadMainPrompts);
}

// View employees by manager
function viewEmployeesByManager() {
  db.findAllEmployees()
    .then(([rows]) => {
      const managerChoices = rows.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
      return promptUser([{ type: "list", name: "managerId", message: "Which employee do you want to see direct reports for?", choices: managerChoices }]);
    })
    .then(({ managerId }) => db.findAllEmployeesByManager(managerId))
    .then(([rows]) => {
      if (rows.length === 0) {
        console.log("The selected employee has no direct reports");
      } else {
        displayTable(rows);
      }
    })
    .then(loadMainPrompts);
}

// Delete an employee
function removeEmployee() {
  handleDelete("employee", db.findAllEmployees, db.removeEmployee);
}

// Update an employee's role
function updateEmployeeRole() {
  handleUpdate(
    "employee",
    db.findAllEmployees,
    db.updateEmployeeRole,
    db.findAllRoles,
    "role"
  );
}

// Update an employee's manager
function updateEmployeeManager() {
  handleUpdate(
    "employee",
    db.findAllEmployees,
    db.updateEmployeeManager,
    db.findAllPossibleManagers,
    "manager"
  );
}


// Load main prompts
loadMainPrompts();

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}