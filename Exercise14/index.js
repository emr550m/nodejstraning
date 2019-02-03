const vm = require('vm');

const x = 1;

const sandbox = { x: 2 };
vm.createContext(sandbox); // Contextify the sandbox.

const code = 'x += 40; var y = 17;';
// x and y are global variables in the sandboxed environment.
// Initially, x has the value 2 because that is the value of sandbox.x.
vm.runInContext(code, sandbox);

console.log("Executed Sandbox X: " + sandbox.x); // 42
console.log("Executed Sandbox Y: " + sandbox.y); // 17

console.log("Local X: " + x); // 1; y is not defined.