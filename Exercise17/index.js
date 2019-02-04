const express = require('express')
const app = express()
var bodyParser = require('body-parser');

var sessions = [];

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {

    if (req.body.username == "emr550m" && req.body.password == "123456") 
    {
        var sessionID = Math.random().toString(36).substring(2, 15);
        sessions.push(sessionID);
        res.json({ result:true, message:"Success", username: "emr550m", sessionId: sessionID });
    } else {
        res.json({ result:false, message:"Incorrect username o password." });
    }

});

app.post('/api/userinfo', (req, res) => {

    if ( sessions.indexOf(req.body.session)   >=0) 
    { 
        res.json({ result:true, message:"Success", username: "emr550m", name: "Emrah Öz" });
    } else {
        res.json({ result:false, message:"Incorrect session." });
    }

});


app.listen(8080, () => console.log("Server Ready On port 8080"));