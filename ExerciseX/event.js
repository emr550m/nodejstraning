const EventEmitter = require('events');

const myEmitter = new EventEmitter();
 

class OutOfContext {

    constructor() {
        this.name = "My Name is Emrah";
        this.Age = "1500";
        this.color = "Reddish"

        myEmitter.on('event',function(){
            this.showMeData();
        });
/*
        myEmitter.on('event',()=>{
            this.showMeData();
        });*/
    }

    showMeData() {
        this.print();
    }

    print() {
        console.log(this.name);
        console.log(this.Age);
        console.log(this.color);
    }
}

var a = new OutOfContext();



myEmitter.emit('event');