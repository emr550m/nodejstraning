

function doSomeNetwork(){

    return new Promise(function(resolve,reject)
    {
           /* setTimeout(() => {
                resolve("Success!!!!");
            }, 1);*/
            setTimeout(() => {
                reject("Rejected!!!!");
            }, 2);
    });
}



var x = doSomeNetwork();

console.log("Before Promise");
x.then(function(response){
    console.log("Promise Success: " + response );
}).catch(function(errorResponse){
    console.log("Promise Error: " + errorResponse);
});
console.log("After Promise");