function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const getOrdinal = (num, ordinals) => {
  const remainder100 = num % 100;
  const remainder10 = num % 10;

  if (remainder100 >= 11 && remainder100 <= 20) {
    return ordinals[2];
  }

  if (remainder10 === 1) {
    return ordinals[0];
  }

  if (remainder10 === 2 || remainder10 === 3 || remainder10 === 4) {
    return ordinals[1];
  }

  return ordinals[2];
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getOrdinal};
