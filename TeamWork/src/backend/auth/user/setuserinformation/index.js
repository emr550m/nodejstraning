 
var mongo = require("../../../../../src/db/mongo");

module.exports = function (requestBody) {
    return new Promise(function (resolve, reject) {

        //mongo.OpenDB().then(()=>{
            mongo.SelectDB("users",{username:requestBody.username}).then((resultset)=>{
                if(resultset.length < 1){
                    reject({ result: false, message: 'No User Found!'  });
                }
                else{

                    mongo.UpdateDB("users", {username:requestBody.username}, 
                    
                    { $set: { name: requestBody.name, surname: requestBody.surname, 
                        age: requestBody.age }}).then((result)=>{
                        
                        resolve({ result: true,  message: 'Operation Success!' });

                    }).catch((err)=>{
                        reject({ result: false, message: err });
                    });;

                } 
            }).catch((err)=>{
                reject({ result: false, message: err });
            });
        //});
        
    });
};


