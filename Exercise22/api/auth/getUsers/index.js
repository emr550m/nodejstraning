
module.exports = function (request, response) {
    return new Promise(function (resolve, reject) {
        
            resolve({ result:true, users: ["Ahmet","Ayşe","Mehmet"] });
         
    });
};


