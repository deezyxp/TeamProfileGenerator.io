const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

// 1. ask details: name, id number, email, role
// 2. ask if you want to add more
// 3. if yes, re-run step 1
// 4. if no, render html

startQuestions();

function startQuestions() {
  inquirer.prompt([{
      type: "input",
      name: "nameEmployee",
      message: "Enter Manager's name:"
    }, {
      type: "input",
      name: "idEmployee",
      message: "Enter Manager ID number: "
    }, {
      type: "input",
      name: "emailEmployee",
      message: "Enter Manager email address: "
    },
    {
      type: "input",
      name: "managerNumber",
      message: "Enter office number:"
    },
    {
      type: "list",
      name: "another",
      message: "Would you like to enter another employee?",
      choices: [
        "Engineer",
        "Intern",
        "No"
      ]
    }
  ]).then(function (data) {
    let manager = new Manager(data.nameEmployee, data.idEmployee, data.emailEmployee, data.managerNumber);
    employees.push(manager);

    switch (data.another) {
      case "Engineer":
        engineerQuestions();
        break;
      case "Intern":
        internQuestions();
        break;
      default:
        renderHtml();
        break;
    }
  })
}

function engineerQuestions() {
  inquirer.prompt([{
    type: "input",
    name: "nameEmployee",
    message: "Enter employee's name:"
  }, {
    type: "input",
    name: "idEmployee",
    message: "Enter employee ID number: "
  }, {
    type: "input",
    name: "emailEmployee",
    message: "Enter employee email address: "
  }, {
    type: "input",
    name: "gitusernameEngineer",
    message: "Enter employee's github username: ",
  }, {
    type: "list",
    name: "another",
    message: "Would you like to enter another employee?",
    choices: [
      "Engineer",
      "Intern",
      "No"
    ]
  }]).then(function (data) {
    let engineer = new Engineer(data.nameEmployee, data.idEmployee, data.emailEmployee, data.gitusernameEngineer)
    employees.push(engineer);
    switch (data.another) {
      case "Engineer":
        engineerQuestions();
        break;
      case "Intern":
        internQuestions();
        break;
      default:
        renderHtml();
        break;
    }
  })
}

function internQuestions() {
  inquirer.prompt([{
      type: "input",
      name: "nameEmployee",
      message: "Enter employee's name:"
    }, {
      type: "input",
      name: "idEmployee",
      message: "Enter employee ID number: "
    }, {
      type: "input",
      name: "emailEmployee",
      message: "Enter employee email address: "
    }, {
      type: "input",
      name: "schoolIntern",
      message: "Enter school intern attends: ",
    }, {
      type: "list",
      name: "another",
      message: "Would you like to enter another employee?",
      choices: [
        "Engineer",
        "Intern",
        "No"
      ]
    }])
    .then(function (data) {
      let intern = new Intern(data.nameEmployee, data.idEmployee, data.emailEmployee, data.schoolIntern)
      employees.push(intern);
      switch (data.another) {
        case "Engineer":
          engineerQuestions();
        case "Intern":
          internQuestions();
        default:
          renderHtml();
      }

    })
}

function renderHtml() {
  fs.writeFileSync(outputPath, render(employees), "utf-8")
}

