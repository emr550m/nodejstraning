var db = require("./mongo");

function checksession(session, username) {
    return new Promise(function (resolve, reject) {
        var result = {
            result: false,
            message: "No reason"
        }

        db.SelectDB("users", {
            username: username,
            'tokens.token': session,
        }, { _id: 1, username: 1, tokens: 1 }).then(function (userInfo) {
            if (userInfo.length > 0) {
                result.success = true;
                resolve(result);
            } else {
                result.message = "Invalid Token";
                reject(result);
            } 
        }).catch(function (errorInfo) {
            result.message = "Invalid Token";
            reject(result);
        });


    })
}

module.exports = {
    checksession
}