const Employee = require("./Employee");

// Intern class extends Employee and contains a school attribute

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.role = "Intern";
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;