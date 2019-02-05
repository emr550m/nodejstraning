const express = require('express')
const app = express()
var bodyParser = require('body-parser');

var sessions = [];
module.exports = sessions;

app.use(bodyParser.json());

//request response logger middleware
app.use(function (req, res, next) {
    var send = res.send;
    res.send = function (data) {
        console.log("Response:" + data + "\n\n");
        send.call(this, data);
    };
    console.log("Request" + JSON.stringify(req.body));
    next();
});


app.post(["/api/open", "/api/open*"], function (request, response, next) {

    var requestRedirect = require("./api/open" + request.url.replace('/api/open', ''));
    requestRedirect(request, response).then(function (result) {
        response.json(result);
        next();
    }).catch(function (err) {
        response.json(err);
        next();
    })
});

app.post(["/api/auth", "/api/auth*"], function (request, response, next) {

    var requestRedirect = require("./api/auth" + request.url.replace('/api/auth', ''));
    if (sessions.indexOf(request.body.session) >= 0) {
        requestRedirect(request, response).then(function (result) {
            response.json(result); 
            next();
        }).catch(function (err) {
            response.json(err); 
            next();
        })
    } else {
        response.json({ result: false, message: "Incorrect session." });
        next();
    }
});

//General Error Logger..
app.use(function (err, req, res, next) {
    if (err) {
        console.log("General Error:");
        console.log(err.stack);
    } 
    res.json({message:"Global Error Occurred"}); 
    next();
});


app.use('/web', express.static(__dirname + '/web'));






app.listen(8080, () => console.log("Server Ready On port 8080"));