'use strict';

const TIMES = ['12:00', '13:00', '14:00'];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const LNG_BOUNDS = {
  MIN: 139.70000,
  MAX: 139.80000,
};

const LAT_BOUNDS = {
  MIN: 35.65000,
  MAX: 35.70000,
};

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

// function getRandomPositiveInteger (a, b) {
//   const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
//   const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// }
//
// function getRandomPositiveFloat (a, b, digits = 1) {
//   const lower = Math.min(Math.abs(a), Math.abs(b));
//   const upper = Math.max(Math.abs(a), Math.abs(b));
//   const result = Math.random() * (upper - lower) + lower;
//   return +result.toFixed(digits);
// }

/* временные данные */

const getRandomAvatar = () => `img/avatars/user${getRandomInteger(1, 10)}.png`;

const getRandomLocationPoint = (min, max) => getRandomFloatNumber(min, max, 5);

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getRandomArrayElements = (array) => {
  const arrayCopy = array.slice();
  const randomQuantity = getRandomInteger(1, array.length);

  const randomArrayElements = [];

  while (randomArrayElements.length < randomQuantity) {
    const randomIndex = getRandomInteger(0, arrayCopy.length - 1);

    const randomElement = arrayCopy[randomIndex];

    randomArrayElements.push(randomElement);
    arrayCopy.splice(randomIndex, 1);
  }

  return randomArrayElements;
};

const createAdvertisement = () => {
  const randomLat = getRandomLocationPoint(LAT_BOUNDS.MIN, LAT_BOUNDS.MAX);
  const randomLng = getRandomLocationPoint(LNG_BOUNDS.MIN, LNG_BOUNDS.MAX);

  return {
    author: {
      avatar: getRandomAvatar(),
    },
    offer: {
      title: 'Уютная квартира в центре города',
      address: `${randomLat}, ${randomLng}`,
      price: getRandomInteger(25000, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 4),
      guest: getRandomInteger(1, 4),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayElements(FEATURES),
      description: 'Не могу придумать',
      photos: getRandomArrayElements(PHOTOS),
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};

/* eslint-disable no-unused-expressions */
const objectGenerator = new Array(10).fill(null).map(createAdvertisement);

objectGenerator;
