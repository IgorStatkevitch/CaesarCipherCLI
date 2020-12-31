const stream = require('stream');
const { shiftChar } = require('./shiftChar');

class Cipher extends stream.Transform {
  constructor(shift) {
    super();
    this.shift = shift;
  }

  _transform(chunk, encoding, cb) {
    const data = chunk.toString();
    const shiftedChunk = shiftChar(data, this.shift);
    this.push(shiftedChunk);
    cb();
  }

  _flush(cb) {
    cb();
  }
}
module.exports = Cipher;
