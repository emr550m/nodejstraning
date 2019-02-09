
var db = require("../../../mongo");
var crypto = require("../../../cyrpto");

module.exports = function (request, response) {
    return new Promise(function (resolve, reject) {

        var { username, password } = request.body;
        if (username && username != "" && password && password != "") {
            db.SelectDB("users", { username }, {}).then(function (userResult) {
                if (userResult.length > 0) {  
                    if (crypto.checkPassword(userResult[0].password, password, userResult[0].salt)) { 
                        var sessionID = crypto.genRandomString(30);

                        var loginTime = new Date();
                        var tokenItem = {
                            token: sessionID,
                            time: loginTime
                        };
                        db.UpdateDB("users", { _id: userResult[0]._id },
                            {
                                $push: {
                                    tokens: {
                                        $each: [tokenItem],
                                        $slice: -5
                                    }
                                },
                                $set: { lastlogin: loginTime, lasttry: loginTime }
                            }
                        ).then((tokenAdd) => {
                            resolve({
                                result: true,
                                username: userResult[0].username,
                                name: userResult[0].name,
                                surname: userResult[0].surname,
                                session: sessionID
                            });

                        });


                    } else {
                        reject({ result: false, message: "Incorrect username o password." });
                    } 
                } else {
                    reject({ result: false, message: "Incorrect username o password." });
                }
            }).catch((err) => {
                reject({ result: false, message: "Incorrect username o password." });
            });

            // var sessionID = Math.random().toString(36).substring(2, 15);
            // sessions.push(sessionID);
            // resolve({ result:true, message:"Success", username: "emr550m", sessionId: sessionID });
        } else {
            reject({ result: false, message: "Incorrect username o password." });
        }
    });
};


