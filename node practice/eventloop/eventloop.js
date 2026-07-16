const fs = require('fs');
const a = 100;

// setImmediate runs in the check phase of the event loop.
setImmediate(() => console.log('Set immediate'));

// Reading a file is an asynchronous I/O operation.
// Its callback runs after the file operation completes.
fs.readFile("./file.txt", "utf-8", () => {
    console.log("file is read");
});

// setTimeout with 0ms is executed in the timer phase.
setTimeout(() => console.log('Set timeout'), 0);

// Output order:
// Set timeout
// Set immediate
// file is read
//
// Explanation:
// The timer callback is queued first and runs before the check phase callback.
// The file read callback runs last because file I/O takes longer to complete.