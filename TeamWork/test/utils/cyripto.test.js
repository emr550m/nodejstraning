
var cyrptoModule = require("../../src/utils/cyrpto");
var crypto = require('crypto');
var assert = require("assert");
var sinon = require("sinon");
var http = require('http');

describe("cyrptoModule", function () {
    describe(" genRandomString", function () {
        it(" should call crypto.randomBytes with given parameter", function () {

            var cSpy = sinon.spy(crypto, "randomBytes");
            cyrptoModule.genRandomString(5);
            assert.equal(cSpy.callCount, 1);
            assert.equal(cSpy.calledWith(Math.ceil(5 / 2)), true);
            cSpy.restore();

        });
    });
    describe(" sha512", function () {
        it(" should return given 123456 and 1234", function () {
            var shaRes = cyrptoModule.sha512("123456", "1234");
            assert.equal(shaRes.salt, "1234");
            assert.equal(shaRes.passwordHash, "2c8ae33bf798dc8b8baa1c49f54d9c1e168f1b7c3e1b660bb189309eb79ee22a69ef2a85f2d5805562f52413df538b281d66a8bba33dd88c40b739e66b6b83df");
        });
    });
    describe(" checkPassword", function () {
        it(" should return true given 2c8ae33bf798dc8b8baa1c... 123456 and 1234", function () {
            var shaRes = cyrptoModule.checkPassword("2c8ae33bf798dc8b8baa1c49f54d9c1e168f1b7c3e1b660bb189309eb79ee22a69ef2a85f2d5805562f52413df538b281d66a8bba33dd88c40b739e66b6b83df", "123456", "1234");
            assert.equal(shaRes, true);
        });
    });
    describe(" saltHashPassword", function () {
        it(" should return 2c8ae33bf798dc8b8baa1c... given 123456", function () {
            var cSpy = sinon.stub(crypto, "randomBytes").callsFake(function(number){
                return "123456";
            })
            var shaRes = cyrptoModule.saltHashPassword("123456"); 
            assert.equal(shaRes.salt, "123456");
            assert.equal(shaRes.passwordHash, "4899f48b7873797086fc392ed8074b34306f79145cf0f9d1757e806da2d43f3876b3c762f38015f2d3593a595ae607a6e0aa103a2a5fe502cf95051c9cd62ee1");
        });
    });
})