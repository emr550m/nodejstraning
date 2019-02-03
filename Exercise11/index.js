var EmitterApi = require("./eventApi");



EmitterApi.on("MyCustomEvent",(msg)=>{
    console.log("MyCustomEvent Fired 1: " + msg)
});


EmitterApi.on("MyCustomEvent",(msg)=>{
    console.log("MyCustomEvent Fired 2: " + msg)
});

EmitterApi.fireEvent("MyCustomEvent","Event message from hello");