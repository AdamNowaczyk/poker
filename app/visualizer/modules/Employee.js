var Person = require('./Person');

function Employee(first, last, dep) {
    this.firstName = first;
    this.lastName = last;
    this.department = dep;
}
Employee.prototype = new Person();

module.exports = Employee;