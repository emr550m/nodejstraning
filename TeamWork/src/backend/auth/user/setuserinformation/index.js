 
var db = require("../../../../db/mongo");    

module.exports = function (requestBody) {
    var { username, password } = requestBody;
    return new Promise(function (resolve, reject) {

        db.SelectDB("users",{ username },{}).then((data) => {
            if(data.length == 0) {
                reject({result:false,message:"No User Found!"});
            }
            else {
                //resolve({result:true,message: data});

                db.UpdateDB("users",{ username: username },{"$set":{"name":"Emrah hello","surname":"Öz","age":35}}).then((data) => {
                    if(data.length < 0) {
                        reject({result:false,message: "UPDATE FAILURE"});
                    }
                    else {
                        resolve({result:true,message: 'Operation Success!'});
                    }
                    
                }).catch((data) => {
                    reject({result:false,message: data});
                });
            }
            
        }).catch((data) => {
            reject({result:false,message: data});
        });
    });
};


