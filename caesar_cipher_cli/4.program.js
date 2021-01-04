const { program } = require('commander');
const fs = require('fs');
const cipher = require('./3.cipher');
const path = require('path');

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift <number>', 'shift value')
  .requiredOption(
    '-a, --action <encode|decode>',
    'action to perform (encode/decode'
  )
  .option('-i, --input <input>', 'input file (if none then stdin is used)')
  .option('-o, --output <output>', 'output file (if none then stdout is used)');

program.parse(process.argv);
const programOptions = program.opts();

const inputStream = () => {
  return new Promise((resolve) => {
    if (programOptions.input) {
      fs.access(
        programOptions.input,
        fs.constants.F_OK | fs.constants.R_OK,
        (error) => {
          if (error) {
            console.error(`No access to input file: ${error}`);
            process.exit(1);
          }
          resolve(
            fs.createReadStream(programOptions.input, {
              flags: 'r',
              encoding: 'utf-8',
            })
          );
        }
      );
    } else {
      console.log('Using stdin as input. Press CTRL+C for exit');
      resolve(process.stdin);
    }
  });
};
const outputStream = () => {
  return new Promise((resolve) => {
    if (programOptions.output) {
      fs.access(programOptions.output, fs.constants.F_OK, (fileExistsError) => {
        if (fileExistsError) {
          fs.access(
            path.dirname(programOptions.output),
            fs.constants.F_OK | fs.constants.W_OK,
            (dirError) => {
              if (dirError) {
                console.error(`Cannot write to output: ${dirError}`);
                process.exit(1);
              }
            }
          );
        } else {
          fs.access(
            programOptions.output,
            fs.constants.F_OK | fs.constants.W_OK,
            (fileError) => {
              if (fileError) {
                console.error(`Cannot write to output: ${fileError}`);
                process.exit(1);
              }
            }
          );
        }
        resolve(fs.createWriteStream(programOptions.output, { flags: 'a' }));
      });
    } else {
      resolve(process.stdout);
    }
  });
};

const transformStream = () => {
  const int = parseInt(programOptions.shift, 10);
  return new Promise((resolve) => {
    if (!isNaN(programOptions.shift)) {
      if (
        programOptions.action !== 'encode' &&
        programOptions.action !== 'decode'
      ) {
        console.log(`Unsupported action: ${programOptions.action}`);
        process.exit(1);
      }
      resolve(new cipher(programOptions.action === 'encode' ? int : -1 * int));
    } else {
      console.error('Shift is not a number');
      process.exit(1);
    }
  });
};

module.exports = {
  inputStream,
  outputStream,
  transformStream,
};
