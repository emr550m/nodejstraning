import vehicleBase from './vehicle';


export default class bike extends vehicleBase {
    constructor(){
        super("Bike");
    }
    speedUp()
    {
        super.speedUp(30);
    }
}