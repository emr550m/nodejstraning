
var mongoClient = require("../../../../db/mongo");

module.exports = function (requestBody) {
    return new Promise(function (resolve, reject) {

        var username = requestBody.username;
        var name = requestBody.name;
        var surname = requestBody.surname;
        var age = requestBody.age;

        mongoClient.SelectDB("users", { username }).then((resultset) => {
            console.log(resultset);
            if (resultset.length > 0) {
                return mongoClient.UpdateDB("users", { username },
                            {  $set: { name: name, surname: surname, age: age } 
                            }).then((result) => {
                                resolve({ result: true,  message: 'Operation Success!' });
                            }).catch((err)=>{
                                reject({ result: false, message: `${err}` } )
                            });
            } else {
                reject({ result: false, message: 'No User Found!'  })
            }
        }).catch((err) => {
            console.log(err);
            reject({ result: false, message: `${err}` } )
        })
    })
};


