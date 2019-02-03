import vehicleBase from './vehicle';


export default class car extends vehicleBase {
    constructor(){
        super("Car");
    }
    speedUp()
    {
        super.speedUp(20);
    }
}