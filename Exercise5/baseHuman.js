module.exports = class BaseHuman {
    constructor(name){
        this.name = name;
        this.type = 'HumanBase';
    }
    walk(){
        console.log("Base Walk");
    }
}