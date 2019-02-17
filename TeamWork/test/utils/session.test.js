
var session = require("../../src/utils/session");
var db = require("../../src/db/mongo");
var assert = require("assert");
var sinon = require("sinon");
var http = require('http');



describe("session", function () {
    describe(" checksession", function () {
        var cSpy = null;
        beforeEach(() => {
            cSpy = sinon.stub(db, "SelectDB").callsFake(function (table, query, filter) {
                return new Promise((resolve, reject) => {
                    if (query.username === "emr550m" && query["tokens.token"] === "123456") {
                        var returnValue = [
                            { _id: "1122334444", username: "emr550m", tokens: ["1", "2", "3"] }
                        ];
                        resolve(returnValue);
                    } else {
                        reject("Incorrect Username And Password");
                    }

                });
            });
        })
        afterEach(() => {
            cSpy.restore();
        })
        it(" should return true", function (done) {
            var sessionResult = session.checksession("123456", "emr550m").then(() => {
                done();
            }).catch((err) => {
                done(err);
            })
        });
        it(" should return false", function (done) {
            var sessionResult = session.checksession("123457", "emr550m").then(() => {
                done("Incorrect Username Acceppted");
            }).catch((err) => {
                done();
            })

        });
    });
    describe(" checksession", function () {
        var cSpy = null;
        beforeEach(() => {
            cSpy = sinon.stub(db, "SelectDB").callsFake(function (table, query, filter) {
                return new Promise((resolve, reject) => {
                    if (query.username === "emr550m" && query["tokens.token"] === "123456") {
                        var returnValue = [ 
                        ];
                        resolve(returnValue);
                    } else {
                        reject("Incorrect Username And Password");
                    }

                });
            });
        })
        afterEach(() => {
            cSpy.restore();
        })
        it(" should return false", function (done) {
            var sessionResult = session.checksession("123456", "emr550m").then(() => {
                done("None existent user exists");
            }).catch((err) => {
                done();
            })
        }); 
    });

});