'use strict'

const getRandomInteger = (from, to) => {
  if (from >= to || from < 0) {
    return;
  }

  return Math.floor(from + Math.random() * (to - from + 1));
};

const getRandomFloatNumber = (from, to, precision) => {
  if (from >= to || from < 0) {
    return;
  }

  const randomNumber = from + Math.random() * (to - from);
  return parseFloat(randomNumber.toFixed(precision));
};

getRandomInteger(30, 100);
getRandomFloatNumber(1.1, 1.2, 2);
