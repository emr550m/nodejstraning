var db = require("../../../../db/mongo");

module.exports = async function (requestBody) {
    return new Promise(async (resolve, reject) => {
        db.SelectDB("users", {name: requestBody.name, surname: requestBody.surname}, {}).then((users) => {
            if(users.length == 0)
            {
                reject({
                    result: false, 
                    message : 'No User Found!'
                })
            }
            else {
                db.InsertDB("usersfound", {usercount:users.length, name: requestBody.name, surname: requestBody.surname}).then((data)=>{
                    var userList = [];
                    users.forEach(user => {
                        userList.push({_id: user._id, name: user.name, surname: user.surname});
                    });
                    resolve({
                        userlist: userList,
                        result: true, 
                        message : 'Operation Success!'
                    });
                }).catch((err) => {
                    reject({
                        result: false, 
                        message : 'INSERT FAILURE'
                    })
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