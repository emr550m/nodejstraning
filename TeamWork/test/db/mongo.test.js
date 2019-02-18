var mongo = require("../../src/db/mongo");
var sinon = require("sinon");
var assert = require("assert");

describe("mongo module", function () {
    var cSpyIsConnected = null;
    var cSpyDb = null;
    afterEach(() => {
        if (cSpyIsConnected != null)
            cSpyIsConnected.restore();
        if (cSpyDb != null)
            cSpyDb.restore();

    })
    describe(" DeleteDB", function () {
        it(" should return resultset for given query", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyDb = sinon.stub(mongo.client, "db").callsFake(
                function (dbname) {
                    return {
                        collection: function (table) {
                            return {
                                deleteMany: function (query, callback) {
                                    callback(null,{});
                                }
                            }
                        }
                    };
                });
                mongo.DeleteDB("users", { username: "emr550m" }).then((result) => {
                    done();
                }).catch((err) => {
                    done(err)
                })

        });
    });
    describe(" DeleteDB", function () {
        it(" should return resultset for given query", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyDb = sinon.stub(mongo.client, "db").callsFake(
                function (dbname) {
                    return {
                        collection: function (table) {
                            return {
                                deleteMany: function (query, callback) {
                                    callback("Delete error occurred",{});
                                }
                            }
                        }
                    };
                });
                mongo.DeleteDB("users", { username: "emr550m" }).then((result) => {
                    done("This should not succeed, it has to fail.");
                }).catch((err) => {
                    done();
                })

        });
    });
    describe(" DeleteDB", function () {
        it(" should return resultset for given query", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return false;
            }); 
                mongo.DeleteDB("users", { username: "emr550m" }).then((result) => {
                    done("This should not succeed, it has to fail.");
                }).catch((err) => {
                    done();
                })

        });
    });
});



describe("mongo module", function () {
    var cSpyIsConnected = null;
    var cSpyDb = null;
    afterEach(() => {
        if (cSpyIsConnected != null)
            cSpyIsConnected.restore();
        if (cSpyDb != null)
            cSpyDb.restore();

    })
    describe(" UpdateDB", function () {
        it(" should return resultset for given query", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyDb = sinon.stub(mongo.client, "db").callsFake(
                function (dbname) {
                    return {
                        collection: function (table) {
                            return {
                                updateMany: function (query,values , callback) {
                                    callback(null,{});
                                }
                            }
                        }
                    };
                });
                mongo.UpdateDB("users", { username: "emr550m" }, { name: "emrah"}).then((result) => {
                    done();
                }).catch((err) => {
                    done(err)
                })

        });
    });
    describe(" UpdateDB", function () {
        it(" should fail for resultset for given query", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyDb = sinon.stub(mongo.client, "db").callsFake(
                function (dbname) {
                    return {
                        collection: function (table) {
                            return {
                                updateMany: function (query,values , callback) {
                                    callback("error happened",{});
                                }
                            }
                        }
                    };
                });
                mongo.UpdateDB("users", { username: "emr550m" }, { name: "emrah"}).then((result) => {
                    done("This should not succeed, it has to fail.");
                }).catch((err) => {
                    done()
                })

        });
    });
    describe(" UpdateDB", function () {
        it(" should fail if there is no db connection", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return false;
            });
            
                mongo.UpdateDB("users", { username: "emr550m" }, { name: "emrah"}).then((result) => {
                    done("This should not succeed, it has to fail.");
                }).catch((err) => {
                    done()
                })

        });
    });
});

describe("mongo module", function () {
    var cSpyIsConnected = null;
    var cSpyDb = null;
    afterEach(() => {
        if (cSpyIsConnected != null)
            cSpyIsConnected.restore();
        if (cSpyDb != null)
            cSpyDb.restore();

    })
    describe(" SelectDB", function () {
        it(" should return resultset for given query", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyDb = sinon.stub(mongo.client, "db").callsFake(
                function (dbname) {
                    return {
                        collection: function (table) {
                            return {
                                find: function (query) {
                                    return {
                                        project: function (fields) {
                                            return {
                                                toArray: function (callback) {
                                                    callback(null, [
                                                        {}, {}, {}
                                                    ])
                                                }
                                            }

                                        }
                                    }

                                }
                            }
                        }
                    };
                });


            mongo.SelectDB("users", { username: "emr550m" }, {}).then((result) => {
                done();
            }).catch((err) => {
                done(err)
            })

        });
        it(" should return error for db reject", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyDb = sinon.stub(mongo.client, "db").callsFake(
                function (dbname) {
                    return {
                        collection: function (table) {
                            return {
                                find: function (query) {
                                    return {
                                        project: function (fields) {
                                            return {
                                                toArray: function (callback) {
                                                    callback("error occurred", [
                                                        {}, {}, {}
                                                    ])
                                                }
                                            }

                                        }
                                    }

                                }
                            }
                        }
                    };
                });


            mongo.SelectDB("users", { username: "emr550m" }, {}).then((result) => {
                done("This should not happen, this needs to be failed.");
            }).catch((err) => {
                done()
            })

        });
        it(" should return error if not connected", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return false;
            });
            


            mongo.SelectDB("users", { username: "emr550m" }, {}).then((result) => {
                done("This should not happen, this needs to be failed.");
            }).catch((err) => {
                done()
            })

        });
    });

});


describe("mongo module", function () {
    var cSpyIsConnected = null;
    var cSpyDb = null;
    afterEach(() => {
        if (cSpyIsConnected != null)
            cSpyIsConnected.restore();
        if (cSpyDb != null)
            cSpyDb.restore();

    })
    describe(" InsertDB", function () {
        it(" should return ok if insert is okey.", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyDb = sinon.stub(mongo.client, "db").callsFake(
                function (dbname) {
                    return {
                        collection: function (table) {
                            return {
                                insertOne: function (model) {
                                    return new Promise(function (resolve, reject) {
                                        resolve(model);
                                    });
                                }
                            }
                        }
                    };
                });

            var model = { testModel: true };
            mongo.InsertDB("users", model).then((result) => {
                if (result.testModel == true) {
                    done();
                } else {
                    done("Insert Error");
                }

            }).catch((err) => {
                done(err);
            });
        });
        it(" should return error if not connected.", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return false;
            });
            cSpyDb = sinon.stub(mongo.client, "db").callsFake(
                function (dbname) {
                    return {
                        collection: function (table) {
                            return {
                                insertOne: function (model) {
                                    return new Promise(function (resolve, reject) {
                                        resolve(model);
                                    });
                                }
                            }
                        }
                    };
                });

            var model = { testModel: true };
            mongo.InsertDB("users", model).then((result) => {
                done("This should not happen");
            }).catch((err) => {
                done();
            });
        });
        it(" should return error insert error occurs.", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyDb = sinon.stub(mongo.client, "db").callsFake(
                function (dbname) {
                    return {
                        collection: function (table) {
                            return {
                                insertOne: function (model) {
                                    return new Promise(function (resolve, reject) {
                                        reject(model);
                                    });
                                }
                            }
                        }
                    };
                });

            var model = { testModel: true };
            mongo.InsertDB("users", model).then((result) => {
                done("This should not happen");
            }).catch((err) => {
                done();
            });
        });
    });
});




describe("mongo module", function () {
    var cSpyIsConnected = null;
    var cSpyConnect = null;
    afterEach(() => {
        if (cSpyIsConnected != null)
            cSpyIsConnected.restore();
        if (cSpyConnect != null)
            cSpyConnect.restore();
    });
    describe(" CloseDB", function () {
        it(" should close on successful case", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyConnect = sinon.stub(mongo.client, "close").callsFake(
                function (callback) { callback(); });


            mongo.CloseDB().then((result) => {
                if (result == "Disconnection Success!") {
                    done();
                }
                else {
                    done("DisConnection Error");
                }
            }).catch((err) => {
                done(err);
            });
        });
        it(" should return error if connection is already closed", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return false;
            });
            cSpyConnect = sinon.stub(mongo.client, "close").callsFake(
                function (callback) { callback(); });


            mongo.CloseDB().then((result) => {

                done("DisConnection Error");
            }).catch((err) => {
                done();
            });
        });
        it(" should return error if discconection error occurrs", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyConnect = sinon.stub(mongo.client, "close").callsFake(
                function (callback) { callback("Error Occurred"); });


            mongo.CloseDB().then((result) => {
                done("DisConnection Error");
            }).catch((err) => {
                done();
            });

        });
    });
});


describe("mongo module", function () {
    var cSpyIsConnected = null;
    var cSpyConnect = null;
    afterEach(() => {
        if (cSpyIsConnected != null)
            cSpyIsConnected.restore();
        if (cSpyConnect != null)
            cSpyConnect.restore();
    });
    describe(" OpenDB", function () {
        it(" should connect on successful case", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return false;
            });
            cSpyConnect = sinon.stub(mongo.client, "connect").callsFake(
                function (callback) { callback(); });


            mongo.OpenDB().then((result) => {
                if (result == "Connection Success!") {
                    done();
                }
                else {
                    done("Connection Error");
                }
            }).catch((err) => {
                done(err);
            });

        });
        it(" should return error if already connected", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return true;
            });
            cSpyConnect = sinon.stub(mongo.client, "connect").callsFake(
                function (callback) { callback(); });

            mongo.OpenDB().then((result) => {
                done("Should not connect if there is a connection")
            }).catch((err) => {
                done();
            });

        });
        it(" should return error if there is connection error", function (done) {
            cSpyIsConnected = sinon.stub(mongo.client, "isConnected").callsFake(function (number) {
                return false;
            });
            cSpyConnect = sinon.stub(mongo.client, "connect").callsFake(
                function (callback) { callback("Error Occurred!"); });


            mongo.OpenDB().then((result) => {
                done("Should not connect if there is an error")
            }).catch((err) => {
                done();
            });

        });
    });
});
