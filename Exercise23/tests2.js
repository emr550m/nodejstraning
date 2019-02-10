
var Person = require("./Person");
var assert = require("assert");

describe("Person", function () {
    describe(" has weight given", function () {
        before(function () {
            console.log("This is before");
        })
        beforeEach(function () {
            console.log("This is before Each");
        })
        it("should weight = 95 given in consturtor 95", function () {
            var hPerson = new Person(35, 1.72, 95);
            assert.equal(hPerson.weight, 95);
        })
        it("should weight = 96.22 given in setWeight 96.22", function () {
            var hPerson = new Person(35, 1.72, 95);
            hPerson.setWeght(96.22);
            assert.equal(hPerson.weight, 96.22);
        })
        after(function () {
            console.log("This is after");
        })
        afterEach(function () {
            console.log("This is after Each");
        })
    });
    describe(" has height given", function () {
        it("should height = 1.72 given in consturtor 1.72", function () {
            var hPerson = new Person(35, 1.72, 95);
            assert.equal(hPerson.height, 1.72);
        })
        it("should height = 1.80 given in setHeight 1.80", function () {
            var hPerson = new Person(35, 1.72, 95);
            hPerson.setHeight(1.80);
            assert.equal(hPerson.height, 1.80);
        })
    });
    describe(" has age given", function () {
        it("should age = 35 given in consturtor 35", function () {
            var hPerson = new Person(35, 1.72, 95);
            assert.equal(hPerson.age, 35);
        })
        it("should age = 40 given in setAge 40", function () {
            var hPerson = new Person(35, 1.72, 95);
            hPerson.setAge(40);
            assert.equal(hPerson.age, 40);
        })
    });
    describe(" body mass", function () {
        it("should be around 32 given in consturtor 35, 1.72, 95", function () {
            var hPerson = new Person(35, 1.72, 95);
            assert.equal(Math.round(hPerson.getBodyMass()), 32);
        })
        it("should be around 24 given in consturtor 40, 1.92, 90", function () {
            var hPerson = new Person(40, 1.92, 90);
            assert.equal(Math.round(hPerson.getBodyMass()), 24);
        })

    });
})