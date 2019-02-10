

class Person {
    constructor(age,height,weight){
        this.age = age;
        this.weight = weight;
        this.height = height;
    }
    setAge(age){
        this.age=age;
    }
    setHeight(height){
        this.height=height;
    }
    setWeght(weight){
        this.weight = weight
    }
    getBodyMass(){
        return this.weight / (this.height*this.height);
    }
}

module.exports = Person;