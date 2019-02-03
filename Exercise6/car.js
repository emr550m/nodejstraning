var vehicleBase =require('./vehicle');


module.exports =   class car extends vehicleBase {
    constructor(){
        super("Car");
    }
    speedUp()
    {
        super.speedUp(20);
    }
}