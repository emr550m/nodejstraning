
var Car = require("./car");
var assert = require("assert");
var sinon = require("sinon");
var http = require('http');

describe("Car", function () {
    describe(" has model given", function () {
        it("should model = Fiesta given in consturtor Fiesta", function () {
            var myCar = new Car(0,"Fiesta","Ford");
            assert.equal(myCar.model, "Fiesta");
        })
        it("should model = Jazz given in setBrand Jazz", function () {
            var myCar = new Car(0,"Fiesta","Ford");
            myCar.setModel("Jazz");
            assert.equal(myCar.model, "Jazz");
        })
        it("should speed up 30 after speedUp with 30", function ( ) {
            var clock = sinon.useFakeTimers()
            var myCar = new Car(0,"Fiesta","Ford");
            myCar.speedUp(30); 
            //this behaves settimout instantly...
            clock.runAll();
            assert.equal(myCar.speed,30); 
        });
        it("checkservice status need to be true after checkService True Case", function (done) {
            var myCar = new Car(0,"Fiesta","Ford");
            assert.equal(myCar.serviceStatus, false);
            var request = sinon.stub(http, 'get').callsFake(function get( url, response ){ 
                    response({
                        on:function(event,trigger){
                            if(event=="end")
                               trigger();
                        }
                    });
            });   
            myCar.checkService().then(()=>{
                assert.equal(myCar.serviceStatus,true);
                done();
            }).catch((err)=>{
                console.log(err)
                assert.equal(myCar.serviceStatus,false);
                done(err);
            }); 
        });

        it("getModelWithName sholud call getBrand and getModel", function () {
            var myCar = new Car(0,"Fiesta","Ford");
            assert.equal(myCar.model, "Fiesta");
            assert.equal(myCar.brand, "Ford"); 
            var spyBrand = sinon.spy(myCar,"getBrand");
            var spyModel = sinon.spy(myCar,"getModel");
            var brWithModel = myCar.getBrandWithModel();
            assert.equal(brWithModel, "Ford/Fiesta");
            assert.equal(spyBrand.callCount,1)
            assert.equal(spyModel.callCount,1)
        })
    }); 
})