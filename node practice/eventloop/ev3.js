const fs = require('fs');

// setImmediate is queued in the check phase of the event loop.
setImmediate(() => console.log('Set immediate'));

// setTimeout with 0ms is queued in the timer phase.
// Timers usually run before setImmediate.
setTimeout(() => console.log('Set timeout'), 0);

// Promise microtasks run after the current synchronous code,
// before the timer and immediate callbacks.
Promise.resolve().then(() => console.log('Promise resolved'));

// Reading a file is asynchronous I/O.
// Its callback runs later, after the file is read.
fs.readFile("./file.txt", "utf-8", () => {
  // Inside this callback, setTimeout is again queued as a timer.
  setTimeout(() => console.log('Set timeout inside readFile'), 0);

  // process.nextTick has the highest priority and runs before other queued callbacks.
  process.nextTick(() => console.log('Next tick inside readFile'));

  // setImmediate inside the I/O callback runs in the check phase.
  setImmediate(() => console.log('Set immediate inside readFile'));

  // This console.log is synchronous, so it runs immediately inside the callback.
  console.log('file is read');
})

// process.nextTick callbacks run before promises and timers.
process.nextTick(() => console.log('Next tick'));

// Output order:
// Next tick
// Promise resolved
// Set timeout
// Set immediate
// file is read
// Next tick inside readFile
// Set immediate inside readFile
// Set timeout inside readFile
//
// Reason:
// 1. process.nextTick runs first.
// 2. Promise microtasks run next.
// 3. setTimeout runs before setImmediate.
// 4. Inside the readFile callback, nextTick still runs before the timer and immediate callbacks.
// 5. The file read callback itself runs after the I/O completes.