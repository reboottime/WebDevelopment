console.info(1);

setTimeout(() => {
  console.info("callback in setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.info("then in promise resolve");
});

console.info(2);


// From top to bottom
// Promise and setTimeout are WebAPI
// Promise is pused into micro task queue
// setTimeout is pushed into macro task queue