const EventEmitter = require('events');

class MyEventMechanism extends EventEmitter {
    constructor(){
        super();
        this.eventsFired = 0;
    }

    fireEvent(eventName,args)
    {
        this.emit(eventName,args);
    }
}

const EmitterApi = new MyEventMechanism();

module.exports = EmitterApi;

 