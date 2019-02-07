var db = require("./mongo")

db.OpenDB().then((result) => {

    console.log(result);
}).then(() => {

    /** return sonra konmalı */
    return db.SelectDB("users", {}).then((users) => {
          return users;
    })

}).then((rrr)=>{

    console.log(rrr);

}).then(()=>{

    return db.InsertDB("users",{ a:1, b:2,c :3}).then((result)=>{
        return result;
    })

}).then((ttt)=>{

    console.log("Inserted Count: " + ttt.insertedCount);

    return db.DeleteDB("users", { a:1 }).then((result)=>{
        return result;
    })  

   
}).then((deleted)=>{

    console.log("deleted count:" + deleted.deletedCount);

    return db.UpdateDB("users",{username:"emr550m"}, {$set: { name:"Emrah 2" } }).then((result)=>{
        return result;
    })
 

}).then((updated)=>{
    console.log("Updated Count:" +  updated.modifiedCount);
    return db.CloseDB().then((result)=>{
        console.log(result);
    });
})