var db = require("../../../../db/mongo");

module.exports = function(requestBody) {
    return new Promise(function (resolve, reject) {
        var { name, surname, age, username } = requestBody;
        db.SelectDB("users", { username }, {}).then((resultItem) => {
            if (resultItem.length > 0) {
               db.UpdateDB("users", { username }, { $set: { name, surname, age  } }).then((result) => {
                    resolve({
                        result: true,
                        message: "Operation Success!"
                    });
                }).catch((err) => {
                    reject({
                        result: false,
                        message: err  
                    });
                }); 
            } else {
                reject({
                    result: false,
                    message: "No User Found!"
                });
            }
        }).catch((err) => {
            reject({
                result: false,
                message: err
            });
        });
    });
};