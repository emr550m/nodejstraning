var userinfofunc = require("../../../../../src/backend/auth/user/setuserinformation");
var mongo = require("../../../../../src/db/mongo");
var sinon = require("sinon");
var assert = require("assert");

describe("setuserinformation", function () {
    var SelectDBSpy = null;
    var UpdateDBSpy = null;
    var requestBody = null;
    beforeEach(() => {
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, username: "emr550m" }
                    ]);
                });
            });
        UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
            function (table, query, values) {
                return new Promise((resolve, reject) => {
                    resolve({});
                });
            });
        requestBody = {
            username: "emr550m",
            name: "Emrah",
            surname: "Öz",
            age: 35
        };

    });
    afterEach(() => {
        SelectDBSpy.restore();
        UpdateDBSpy.restore();
        requestBody = null;
    });
    describe(" should be", function () {
        it(" type of a function", function () {
            assert.equal(typeof (userinfofunc), "function");
        });
        it(" return a promise", function () {
            var p = userinfofunc(requestBody);
            assert.equal(Promise.resolve(p), p);
        });
    });
    describe(" should", function () {
        it(" call SelectDB", function () {
            var p = userinfofunc(requestBody);
            assert.equal(SelectDBSpy.callCount, 1);
        });
    });
});


describe("setuserinformation", function () {
    var SelectDBSpy = null;
    var UpdateDBSpy = null;
    var requestBody = null;
    beforeEach(() => {
        UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
            function (table, query, values) {
                return new Promise((resolve, reject) => {
                    resolve({});
                });
            });
        requestBody = {
            username: "emr550m",
            name: "Emrah",
            surname: "Öz",
            age: 35
        };

    });
    afterEach(() => {
        SelectDBSpy.restore();
        UpdateDBSpy.restore();
        requestBody = null;
    });

    describe(" should", function () {
        it(" call SelectDB with 'users' as first parameter", function (done) {
            SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
                function (table, query, fields) {
                    return new Promise((resolve, reject) => {
                        if (table !== "users") {
                            reject("table name is not users");
                            return;
                        }

                        resolve([
                            { _id: 1, username: "emr550m" }
                        ]);
                    });
                });
            var p = userinfofunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("first parameter to SelectDB must be 'users'");
            })
        });
        it(" call SelectDB second parameter must contain username field", function (done) {
            SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
                function (table, query, fields) {
                    return new Promise((resolve, reject) => {
                        if (!query || !query.username) {
                            reject("query doesnot contain username field");
                            return;
                        }
                        resolve([
                            { _id: 1, username: "emr550m" }
                        ]);
                    });
                });
            var p = userinfofunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("call SelectDB second parameter must contain username field");
            })
        });
    });
});


describe("setuserinformation", function () {
    var SelectDBSpy = null;
    var UpdateDBSpy = null;
    var requestBody = null;
    beforeEach(() => {
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([]);
                });
            });
        UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
            function (table, query, values) {
                return new Promise((resolve, reject) => {
                    resolve({});
                });
            });
        requestBody = {
            username: "emr550m",
            name: "Emrah",
            surname: "Öz",
            age: 35
        };

    });
    afterEach(() => {
        SelectDBSpy.restore();
        UpdateDBSpy.restore();
        requestBody = null;
    });
    describe(" should return ", function () {
        it(" { result: false, message: 'No User Found!'  } object to reject if selectdb return 0 result.", function (done) {
            var p = userinfofunc(requestBody).then((result) => {
                done("result must be rejected");
            }).catch((err) => {
                if (err.result === false && err.message && err.message === 'No User Found!') {
                    done();
                } else {
                    done("incorrect reject return value");
                }
            })
        });
    });
});



describe("setuserinformation", function () {
    var SelectDBSpy = null;
    var UpdateDBSpy = null;
    var requestBody = null;
    beforeEach(() => {
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    reject("DB ERROR OCCURRED");
                });
            });
        UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
            function (table, query, values) {
                return new Promise((resolve, reject) => {
                    resolve({});
                });
            });
        requestBody = {
            username: "emr550m",
            name: "Emrah",
            surname: "Öz",
            age: 35
        };

    });
    afterEach(() => {
        SelectDBSpy.restore();
        UpdateDBSpy.restore();
        requestBody = null;
    });
    describe(" should return ", function () {
        it(" { result: false, message: '[err]'  } object to reject if selectdb returns reject([err]). The given error must be put to 'message' field  at the returning object result", function (done) {
            var p = userinfofunc(requestBody).then((result) => {
                done("result must be rejected");
            }).catch((err) => {
                if (err.result === false && err.message && err.message === "DB ERROR OCCURRED") {
                    done();
                } else {
                    done("incorrect reject return value");
                }
            })
        });
    });
});


describe("setuserinformation", function () {
    var SelectDBSpy = null;
    var UpdateDBSpy = null;
    var requestBody = null;
    var called = false;
    beforeEach(() => { 
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, username: "emr550m" }
                    ]);
                });
            });
        UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
            function (table, query, values) { 
                return new Promise((resolve, reject) => {
                    resolve({});
                });
            });
        requestBody = {
            username: "emr550m",
            name: "Emrah",
            surname: "Öz",
            age: 35
        };

    });
    afterEach(() => { 
        SelectDBSpy.restore();
        UpdateDBSpy.restore();
        requestBody = null;
    });
    describe(" should", function () {
        it(" call UpdateDB", function (done) {
            var p = userinfofunc(requestBody).then((result)=>{ 
                if(UpdateDBSpy.callCount==1){
                    done();
                }else{
                    done("UpdateDB not called or called more than once")
                }
            });
            
        });
    });
});


describe("setuserinformation", function () {
    var SelectDBSpy = null;
    var UpdateDBSpy = null;
    var requestBody = null;
    var called = false;
    beforeEach(() => { 
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, username: "emr550m" }
                    ]);
                });
            });
        UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
            function (table, query, values) { 
                return new Promise((resolve, reject) => {
                    reject("UPDATE FAILURE");
                });
            });
        requestBody = {
            username: "emr550m",
            name: "Emrah",
            surname: "Öz",
            age: 35
        };

    });
    afterEach(() => { 
        SelectDBSpy.restore();
        UpdateDBSpy.restore();
        requestBody = null;
    });
    describe("  should return reject with object if UpdateDB fails.", function () {
        it("  { result: false, message: '[err]'  } whatever UpdateDB returns as reject([err]). The given error must be put to 'message' field  at the returning object result", function (done) {
            var p = userinfofunc(requestBody).then((result) => {
                done("result must be rejected");
            }).catch((err) => {
                if (err.result === false && err.message && err.message === "UPDATE FAILURE") {
                    done();
                } else {
                    done("incorrect reject return value");
                }
            })
            
        });
    });
});



describe("setuserinformation", function () {
    var SelectDBSpy = null;
    var UpdateDBSpy = null;
    var requestBody = null;
    var called = false;
    beforeEach(() => { 
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, username: "emr550m" }
                    ]);
                });
            });
        UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
            function (table, query, values) { 
                return new Promise((resolve, reject) => {
                    resolve({});
                });
            });
        requestBody = {
            username: "emr550m",
            name: "Emrah",
            surname: "Öz",
            age: 35
        };

    });
    afterEach(() => { 
        SelectDBSpy.restore();
        UpdateDBSpy.restore();
        requestBody = null;
    });
    describe(" should return resolve with", function () {
        it(" { result: true,  message: 'Operation Success!' }  if UpdateDB operation succeeds.", function (done) {
            var p = userinfofunc(requestBody).then((result)=>{  
                if(result.result && result.message==='Operation Success!'){
                    done();  
                }else{
                    done("incorrect return object");
                }
                    
            }).catch((err)=>{
                done("This has to succeed.");
            });
            
        });
    });
});



describe("setuserinformation", function () {
    var SelectDBSpy = null;
    var UpdateDBSpy = null;
    var requestBody = null;
    beforeEach(() => {
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, username: "emr550m" }
                    ]);
                });
            }); 
        requestBody = {
            username: "emr550m",
            name: "Emrah",
            surname: "Öz",
            age: 35
        };

    });
    afterEach(() => {
        SelectDBSpy.restore();
        UpdateDBSpy.restore();
        requestBody = null;
    });

    describe(" should", function () {
        it(" call UpdateDB with 'users' as first parameter", function (done) {
            UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
                function (table, query, values) {
                    return new Promise((resolve, reject) => {
                        if(table!=="users"){
                            reject("first parameter to UpdateDB must be 'users'");
                        }else{
                            resolve({});
                        } 
                    });
                });
            var p = userinfofunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("first parameter to UpdateDB must be 'users'");
            })
        });
        it(" call UpdateDB second parameter must contain username field", function (done) {
            UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
                function (table, query, values) {
                    return new Promise((resolve, reject) => {
                        if (!query || !query.username) {
                            reject("query doesnot contain username field");
                            return;
                        }else{
                            resolve({});
                        } 
                    });
                });
            var p = userinfofunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("call UpdateDB second parameter must contain username field");
            })
        });
        it(" call UpdateDB third parameter must be { $set: { name: [name], surname: [surname], age: [age] } }", function (done) {
            UpdateDBSpy = sinon.stub(mongo, "UpdateDB").callsFake(
                function (table, query, values) {
                    return new Promise((resolve, reject) => {
                        var v = JSON.stringify(values);
                        if(v==='{"$set":{"name":"Emrah","surname":"Öz","age":35}}'){
                            resolve({});
                        }else{
                            reject("thir parameter incorrect syntax");
                        } 
                    });
                });
            var p = userinfofunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("Third parameter must be { $set: { name: [name], surname: [surname], age: [age] } }");
            })
        });
    });
});