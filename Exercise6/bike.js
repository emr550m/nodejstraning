var vehicleBase = require('./vehicle')


module.exports =  class bike extends vehicleBase {
    constructor(){
        super("Bike");
    }
    speedUp()
    {
        super.speedUp(30);
    }
}
//comment