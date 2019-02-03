const fs=require("fs");
var path = require("path");

class Logger {
    constructor(filename) {
        this.fileName = filename; 
    }
    addLog(logData) {
        console.log(path.resolve(__dirname) + "/" +  this.fileName);
        fs.appendFile(path.resolve(__dirname) + "/" +  this.fileName, new Date() + ' :' + logData + "\n", (err) => {
            if (err) throw err;
        });
    }
}
const FileLogger = new Logger("logs.txt");

module.exports = FileLogger;