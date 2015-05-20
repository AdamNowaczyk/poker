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

module.exports = Person;
