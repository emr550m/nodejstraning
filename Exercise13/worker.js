const http = require('http');

console.log("Process: " +  process.argv[2])

 
process.on('message', (m) => {
    console.log('Process ' +  process.argv[2] + ' has message From Master:' + m);
    process.send("I got your message Master! I am " + process.argv[2]  );

    if(m=="KILL"){
        process.exit("Master said DIE!");
    }
});

http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000 + parseInt(process.argv[2]) );
