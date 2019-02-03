
var BaseHuman = require('./baseHuman');


module.exports = class Saphiens extends BaseHuman
        {
            constructor(name){
                super(name); 
            }
            walk(){
                super.walk();
                console.log("Saphien Walk");
            }

        }