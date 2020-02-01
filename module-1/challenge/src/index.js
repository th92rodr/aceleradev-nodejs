'use strict';

const fibonacci = () => {
  let array = [0, 1];
  let index = 1;
  do {
    index += 1;
    array[index] = array[index - 1] + array[index - 2];
  } while (array[index] <= 350);

  return array;
};

const isFibonnaci = (num) => {
  if (num === 0 || num === 1) return true;
  let array = [0, 1];
  let index = 2;
  while (true) {
    array[index] = array[index - 1] + array[index - 2];
    if (array[index] === num) return true;
    else if (array[index] < num) index += 1;
    else return false;
  }
};

module.exports = {
  fibonacci,
  isFibonnaci
};
