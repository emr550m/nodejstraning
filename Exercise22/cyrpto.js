var crypto = require('crypto');

function genRandomString(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') 
            .slice(0,length);   
};
 
function sha512(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function checkPassword(passWordHash,pass,salt)
{
    return sha512(pass,salt).passwordHash === passWordHash;
}

function saltHashPassword(userpassword) {
    var salt = genRandomString(16);  
    var passwordData = sha512(userpassword, salt);
    return passwordData; 
}
 

module.exports ={
    saltHashPassword,
    checkPassword,
    genRandomString
}