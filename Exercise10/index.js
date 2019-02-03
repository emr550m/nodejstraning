process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});
process.on('uncaughtException', (err) => {
    console.log(`Exception: ${err}`);
});



console.log("App Started");

try { 
    throw "catch me if you can"; 
} catch (e) {
    console.log("Handled: " + e);
}

throw "This is not handled!";


process.exit(112);