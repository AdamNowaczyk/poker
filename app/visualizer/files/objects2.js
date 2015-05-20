function extend(destination, source) {
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
            destination[k] = source[k];
        }
    }
    return destination;
}

var p = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    getFirstName: function () {
        return this.firstName;
    },
    getLastName: function () {
        return this.lastName;
    }
};
var e = {};
extend(e, p);
e.firstName = 'Stefan';
e.lastName = 'Nowak';
e.department = 'IT';

renderObjects(p, e);