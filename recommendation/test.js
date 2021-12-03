// import process
const { spawn } = require("child_process");
// 1.  provide commend
// 2.
const ls = spawn("python", ["recommender.py"]);

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

//listen on the close event
ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
