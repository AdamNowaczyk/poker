var __extends = this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        __.prototype = b.prototype;
        d.prototype = new __();
    };
var Person = (function () {
    function Person(first, last) {
        this.firstName = first;
        this.lastName = last;
    }

    Person.prototype.getFirstName = function () {
        return this.firstName;
    };
    Person.prototype.getLastName = function () {
        return this.lastName;
    };
    return Person;
})();
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(first, last, dep) {
        _super.call(this, first, last);
        this.department = dep;
    }

    return Employee;
})(Person);

var p = new Person('Jan', 'Kowalski');
var e = new Employee('Stefan', 'Nowak', 'IT');

renderObjects(p, e);
