

const { spawn , fork } = require('child_process');

const ls = spawn('ls', [ ]);

/*
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  }); */

//fork some child process


var childs = [];
  for(var i=1;i<4;i++){
    
       childs[i] = fork(`${__dirname}/worker.js`, [i*10]);

       childs[i].on('message', (m) => {
        console.log('Child Says:', m);
       }); 
   }


   for(var i=1;i<4;i++){
    childs[i].send("Master says hi!")
   }


   setTimeout(function(){
    for(var i=1;i<4;i++){
      childs[i].send("KILL")
     }
   },5000); 

  