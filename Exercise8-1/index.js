

async function doSomeNetwork() {

    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve("Success!!!!");
        }, 1);/* 
            setTimeout(() => {
                reject("Rejected!!!!");
            }, 2);*/
    });
}

async function CallerFunction() {

    console.log("Before Promise");
    var x = await doSomeNetwork(); 
    console.log("Promise Success: " + x); 
    console.log("After Promise");
}



CallerFunction();
console.log("Are we waiting?")