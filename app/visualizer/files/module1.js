var module = module || {};

module.person = function () {
    var privateName = 'private name';

    return {
        publicName: 'public name'
    };
};

var p = module.person();

console.log(p.privateName);
console.log(p.publicName);
