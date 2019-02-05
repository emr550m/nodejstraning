
var sessions = require('../../../index');

module.exports = function (request, response) {
    return new Promise(function (resolve, reject) {
        if (request.body.username == "emr550m" && request.body.password == "123456") 
        {
            var sessionID = Math.random().toString(36).substring(2, 15);
            sessions.push(sessionID);
            resolve({ result:true, message:"Success", username: "emr550m", sessionId: sessionID });
        } else {
            reject({ result:false, message:"Incorrect username o password." });
        }
    });
};


