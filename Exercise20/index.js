var connectionString = "mongodb://duoapp:duoapp@duoapp-shard-00-00-4apei.mongodb.net:27017,duoapp-shard-00-01-4apei.mongodb.net:27017,duoapp-shard-00-02-4apei.mongodb.net:27017/test?ssl=true&replicaSet=duoapp-shard-0&authSource=admin&retryWrites=true";


const MongoClient = require('mongodb').MongoClient;
const dbName = 'duodb';
const client = new MongoClient(connectionString, { useNewUrlParser: true });


client.connect(function (err) {
    if (err == null) {
        console.log("Connection Success!");
       /*
        console.log("Lets Close After 4 seconds");
        setTimeout(() => { 
            client.close(function (err) {
                if (err == null) {
                    console.log("Disconnection Success!");
                } else {
                    console.log(err);
                }
            });
        }, 4000);
*/

        client.db(dbName).collection("users").find({}).project({}).toArray(function(err,res){
            if (err) {
                console.log("Selection Error! " + err);
            }else{
                console.log(JSON.stringify(res));
            } 
        });

    } else {
        console.log("Connection Error! " + err);
    }
});