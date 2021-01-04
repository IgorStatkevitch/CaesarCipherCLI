const { inputStream, outputStream, transformStream } = require('./4.program');
const { pipeline } = require('stream');

async function runProgram() {
  try {
    await pipeline(
      await inputStream(),
      await transformStream(),
      await outputStream(),
      (err) => {
        if (err) {
          console.error('Pipeline failed.', err);
        } else {
          console.log('Pipeline succeeded.');
        }
      }
    );
  } catch (e) {
    console.error(`Error: ${e}`);
  }
}
runProgram();
