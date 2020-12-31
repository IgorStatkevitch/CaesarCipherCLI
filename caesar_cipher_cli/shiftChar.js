function shiftChar(data, shift) {
  shift = Number.parseInt(shift);

  const CHARS_START = {
    upperCase: 65,
    lowerCase: 97,
  };

  const CHARS_QUANTITY = 26;

  return data.replace(/[A-Za-z]/g, (char) => {
    const currentChar = char.charCodeAt();
    const letterCase = currentChar >= 97 ? 'lowerCase' : 'upperCase';
    const changePositionFromZero =
      currentChar - CHARS_START[letterCase] + shift;

    let changeCharCode;
    let helper = changePositionFromZero % CHARS_QUANTITY;

    if (shift < 0) {
      if (helper < 0) helper = CHARS_QUANTITY + changePositionFromZero;
      changeCharCode = helper + CHARS_START[letterCase];
    } else {
      changeCharCode = helper + CHARS_START[letterCase];
    }
    return String.fromCharCode(changeCharCode);
  });
}

module.exports = { shiftChar };
