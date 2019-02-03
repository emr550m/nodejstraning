module.exports =  class vehicleBase {
    constructor(typename)
    {
        this.typeName = typename;
        this.speed = 0;
    }
    printType(){
        console.log(this.typeName);
    }
    printSpeed(){
        console.log(this.speed);
    }
    speedUp(speed)
    {
        this.speed += speed;
    }
}