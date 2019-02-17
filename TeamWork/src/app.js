const express = require('express')
var bodyParser = require('body-parser');
var db = require('./db/mongo');
var sessionUtil = require("./utils/session");
var mongoSanitize = require('express-mongo-sanitize');

module.exports.StartApp =function StartApp() {
    db.OpenDB().then((result) => {
        console.log("DB Connection OK: " + result);

        const app = express()
        app.use(bodyParser.json());
        app.use(mongoSanitize({ replaceWith: '_' }));

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

            var requestRedirect = require("./backend/open" + request.url.replace('/api/open', ''));
            requestRedirect(request.body).then(function (result) {
                response.json(result);
                next();
            }).catch(function (err) {
                response.json(err);
                next();
            })
        });

        app.post(["/api/auth", "/api/auth*"], function (request, response, next) {

            var requestRedirect = require("./backend/auth" + request.url.replace('/api/auth', ''));
            var { username, session } = request.body;
            if (username && session) {
                sessionUtil.checksession(session, username).then(() => {
                    requestRedirect(request.body).then(function (result) {
                        response.json(result);
                        next();
                    }).catch(function (err) {
                        response.json(err);
                        next();
                    })
                }).catch(function (err) {
                    response.json(err);
                    next();
                });
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
            res.json({ message: "Global Error Occurred" });
            next();
        });
        app.listen(8080, () => console.log("Server Ready On port 8080"));

    }).catch((err) => {
        console.log("DB Connection Not OK!: " + err);
    });
};






