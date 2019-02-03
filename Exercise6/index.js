var car = require('./car');
var bike = require('./bike');


var Toyota = new car();
Toyota.printType();
Toyota.speedUp();
Toyota.printSpeed();


var Honda = new bike();
Honda.printType()
Honda.speedUp();
Honda.printSpeed();