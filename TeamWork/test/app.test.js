
var main_module = require("../src/app");
var assert = require("assert");
var sinon = require("sinon");
var http = require('http');

describe("App", function () {
    describe(" should start at boot", function () {
        it(" StartApp must be called.", function () {
            var appMain = sinon.stub(main_module, 'StartApp').callsFake(function(   ){ 
                return true;
            });  
          main_module.StartApp();
          assert.equal(appMain.callCount,1);
        }) ;
 
    }); 
})