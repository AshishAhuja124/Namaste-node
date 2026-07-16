const fs = require('fs');
const a = 100;

setImmediate(() => console.log('Set immediate'));

fs.readFile("./file.txt", "utf-8", () => {
    console.log("file is read");
});

setTimeout(() => console.log('Set timeout'), 0);

//Set timeout
// Set immediate
// file is read