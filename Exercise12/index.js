var Logger  = require("./loggerApi");


Logger.addLog("App Started!");


for(var i =0;i<15;i++){
    Logger.addLog("Iteration " + i + " started!"); 

    console.log(i);

    Logger.addLog("Iteration " + i + " successfull!");   
}


Logger.addLog("App Ended!");