var getuserlistfunc = require("../../../../../src/backend/auth/user/getUserlist");
var mongo = require("../../../../../src/db/mongo");
var sinon = require("sinon");
var assert = require("assert");

describe("getuserlist", function () {
    var SelectDBSpy = null; 
    var InsertDBSpy = null;
    var requestBody = null;
    beforeEach(() => {
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, name: "Emrah", surname: "Öz" }
                    ]);
                });
            }); 
        InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
            function (table,  fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, name: "Emrah", surname: "Öz" }
                    ]);
                });
            });
        requestBody = {
            name: "Emrah",
            surname: "Öz",
        };

    });
    afterEach(() => {
        SelectDBSpy.restore(); 
        InsertDBSpy.restore();
        requestBody = null;
    });
    describe(" should be", function () {
        it(" type of a function", function () {
            assert.equal(typeof (getuserlistfunc), "function");
        });
        it(" return a promise", function () {
            var p = getuserlistfunc(requestBody);
            assert.equal(Promise.resolve(p), p);
        });
    });
    describe(" should", function () {
        it(" call SelectDB", function () {
            var p = getuserlistfunc(requestBody);
            assert.equal(SelectDBSpy.callCount, 1);
        }); 
    });
});


describe("getuserlist", function () {
    var SelectDBSpy = null; 
    var InsertDBSpy = null;
    var requestBody = null;
    beforeEach(() => { 
        InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
            function (table,  fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, name: "Emrah", surname: "Öz" }
                    ]);
                });
            }); 
        requestBody = { 
            name: "Emrah",
            surname: "Öz", 
        };

    });
    afterEach(() => {
        SelectDBSpy.restore();
        InsertDBSpy.restore(); 
        requestBody = null;
    });

    describe(" should", function () {
        it(" call SelectDB with 'users' as first parameter", function (done) {
            SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
                function SelectDB(table, query, fields) {
                    return new Promise((resolve, reject) => {
                        if (table !== "users") {
                            reject("table name is not users");
                            return;
                        }

                        resolve([
                            { _id: 1, name: "Emrah"  , surname: "Öz" }
                        ]);
                    });
                });
            var p = getuserlistfunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("first parameter to SelectDB must be 'users'"  + err);
            })
        });
        it(" call SelectDB second parameter must contain  name and surname field", function (done) {
            SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
                function (table, query, fields) {
                    return new Promise((resolve, reject) => {
                        if (!query || !query.name || !query.surname) {
                            reject("query doesnot contain both name and surname field");
                            return;
                        }
                        resolve([
                            { _id: 1, name: "Emrah"  , surname: "Öz" }
                        ]);
                    });
                });
            var p = getuserlistfunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("call SelectDB second parameter must contain  name and surname field");
            })
        });
    });
});


describe("getuserlist", function () {
    var SelectDBSpy = null; 
    var InsertDBSpy = null;
    var requestBody = null;
    beforeEach(() => {
        InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
            function (table,  fields) {
                return new Promise((resolve, reject) => {
                    resolve( );
                });
            });
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([]);
                });
            }); 
        requestBody = { 
            name: "Emrah",
            surname: "Öz", 
        };

    });
    afterEach(() => {
        SelectDBSpy.restore(); 
        InsertDBSpy.restore();
        requestBody = null;
    });
    describe(" should return ", function () {
        it(" { result: false, message: 'No User Found!'  } object to reject if selectdb return 0 result.", function (done) {
            var p = getuserlistfunc(requestBody).then((result) => {
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



describe("getuserlist", function () {
    var SelectDBSpy = null; 
    var InsertDBSpy = null;
    var requestBody = null;
    beforeEach(() => {
        InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
            function (table,  fields) {
                return new Promise((resolve, reject) => {
                    resolve( );
                });
            });
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    reject("DB ERROR OCCURRED");
                });
            }); 
        requestBody = { 
            name: "Emrah",
            surname: "Öz", 
        };

    });
    afterEach(() => {
        SelectDBSpy.restore(); 
        InsertDBSpy.restore();
        requestBody = null;
    });
    describe(" should return ", function () {
        it(" { result: false, message: '[err]'  } object to reject if selectdb returns reject([err]). The given error must be put to 'message' field  at the returning object result", function (done) {
            var p = getuserlistfunc(requestBody).then((result) => {
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


describe("getuserlist", function () {
    var SelectDBSpy = null; 
    var requestBody = null;
    var called = false;
    beforeEach(() => {
        InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
            function (table,  fields) {
                return new Promise((resolve, reject) => {
                    resolve( );
                });
            });
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, name: "Emrah" , surname: "Öz"}
                    ]);
                });
            }); 
        requestBody = { 
            name: "Emrah",
            surname: "Öz", 
        };

    });
    afterEach(() => {
        SelectDBSpy.restore();
        InsertDBSpy.restore(); 
        requestBody = null;
    });
    describe(" should", function () {
        it(" call InsertDB", function (done) {
            var p = getuserlistfunc(requestBody).then((result)=>{
                if(InsertDBSpy.callCount==1){
                    done();
                }else{
                    done("InsertDB not called or called more than once")
                }
            });

        });
    });
});


describe("setuserinformation", function () {
    var SelectDBSpy = null; 
    var InsertDBSpy = null;
    var requestBody = null;
    var called = false;
    beforeEach(() => {
        InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
            function (table,  fields) {
                return new Promise((resolve, reject) => {
                    reject("INSERT FAILURE");
                });
            });
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, name: "Emrah" , surname: "Öz"}
                    ]);
                });
            }); 
        requestBody = { 
            name: "Emrah",
            surname: "Öz", 
        };

    });
    afterEach(() => {
        SelectDBSpy.restore(); 
        InsertDBSpy.restore();
        requestBody = null;
    });
    describe("  should return reject with object if InsertDB fails.", function () {
        it("  { result: false, message: '[err]'  } whatever InsertDB returns as reject([err]). The given error must be put to 'message' field  at the returning object result", function (done) {
            var p = getuserlistfunc(requestBody).then((result) => {
                done("result must be rejected");
            }).catch((err) => {
                if (err.result === false && err.message && err.message === "INSERT FAILURE") {
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
    var InsertDBSpy = null;
    var requestBody = null;
    var called = false;
    beforeEach(() => {
        InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
            function (table,  fields) {
                return new Promise((resolve, reject) => {
                    resolve({});
                });
            });
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, name: "Emrah" , surname: "Öz"},
                        { _id: 2, name: "Emrah" , surname: "Öz"}
                    ]);
                });
            }); 
        requestBody = { 
            name: "Emrah",
            surname: "Öz", 
        };

    });
    afterEach(() => {
        SelectDBSpy.restore();
        InsertDBSpy.restore();
        requestBody = null;
    });
    describe(" should return resolve with", function () {
        it('{ result: true,  message: "Operation Success!" userlist: [{ _id: 1, name: "Emrah" , surname: "Öz"},  { _id: 2, name: "Emrah" , surname: "Öz"}] }  if InsertDB operation succeeds.', function (done) {
            var p = getuserlistfunc(requestBody).then((result)=>{
                if(result.result && result.message==='Operation Success!'){
                    done();
                }else{
                    done("incorrect return object");
                }

            }).catch((err)=>{
                done("This has to succeed.");
            });

        });
        it(' { result: true,  message: "Operation Success!" userlist: [{ _id: 1, name: "Emrah" , surname: "Öz"},  { _id: 2, name: "Emrah" , surname: "Öz"}] }  if InsertDB operation succeeds.', function (done) {
            var p = getuserlistfunc(requestBody).then((result)=>{
                if(result.result && result.userlist && result.userlist.length===2){
                    assert.deepEqual(result.userlist, [
                        { _id: 1, name: "Emrah" , surname: "Öz"},
                        { _id: 2, name: "Emrah" , surname: "Öz"}
                    ] );
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
    var InsertDBSpy = null;
    var requestBody = null;
    beforeEach(() => { 
        SelectDBSpy = sinon.stub(mongo, "SelectDB").callsFake(
            function (table, query, fields) {
                return new Promise((resolve, reject) => {
                    resolve([
                        { _id: 1, name: "Emrah" , surname: "Öz"},
                        { _id: 2, name: "Emrah" , surname: "Öz"},
                        { _id: 3, name: "Emrah" , surname: "Öz"}
                    ]);
                });
            });
        requestBody = { 
            name: "Emrah",
            surname: "Öz", 
        };

    });
    afterEach(() => {
        SelectDBSpy.restore();
        InsertDBSpy.restore();
        requestBody = null;
    });

    describe(" should", function () {
        it(" call InsertDB with 'usersfound' as first parameter", function (done) {
            InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
                function (table, values) {
                    return new Promise((resolve, reject) => {
                        if(table!=="usersfound"){
                            reject("first parameter to InsertDB must be 'usersfound'");
                        }else{
                            resolve({});
                        }
                    });
                });
            var p = getuserlistfunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("first parameter to InsertDB must be 'usersfound'");
            })
        });
        it(" call InsertDB second parameter must contain usercount field", function (done) {
            InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
                function (table, values) {
                    return new Promise((resolve, reject) => {
                        if (!values || !values.usercount) {
                            reject("query doesnot contain usercount field");
                            return;
                        }else{
                            resolve({});
                        }
                    });
                });
            var p = getuserlistfunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("call InsertDB second parameter must contain usercount field");
            })
        });
        it(" call InsertDB second parameter usercount must equal to returning result count in selectDB", function (done) {
            InsertDBSpy = sinon.stub(mongo, "InsertDB").callsFake(
                function (table, values) {
                    return new Promise((resolve, reject) => {
                        var v = JSON.stringify(values);
                        if (values && values.usercount) {
                            if (values.usercount!=3){
                                reject("usercount must equal to returning result count in selectDB"); 
                            }else{
                                resolve({});
                            }
                        }else{
                            reject("usercount must equal to returning result count in selectDB");
                        }
                    });
                });
            var p = getuserlistfunc(requestBody).then(() => {
                done();
            }).catch((err) => {
                done("usercount must equal to returning result count in selectDB");
            })
        });
    });
}); 