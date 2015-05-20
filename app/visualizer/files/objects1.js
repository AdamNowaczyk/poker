function Person(first, last) {
    this.firstName = first;
    this.lastName = last;
    this.getFirstName = function () {
        return this.firstName;
    };
}
Person.prototype.getLastName = function () {
    return this.lastName;
};

function Employee() {
    this.department = 'IT';
}
Employee.prototype = Person.prototype;
//Employee.prototype = new Person();
//Employee.prototype = Object.create(Person.prototype);

var p = new Person('Jan', 'Kowalski');
var e1 = new Employee();
var e2 = Object.create(p);
e2.department = 'Telco';

console.log(p);
console.log(e1);
console.log(e2);

renderObjects(p, e1, e2);