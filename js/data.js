import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement} from './utils.js';

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

/* временные данные */

const getRandomAvatar = () => `img/avatars/user${getRandomPositiveInteger(1, 10)}.png`;

const getRandomLocationPoint = (min, max) => getRandomPositiveFloat(min, max, 5);

const getRandomArrayElements = (array) => {
  const arrayCopy = array.slice();
  const randomQuantity = getRandomPositiveInteger(1, array.length);

  const randomArrayElements = [];

  while (randomArrayElements.length < randomQuantity) {
    const randomIndex = getRandomPositiveInteger(0, arrayCopy.length - 1);

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
      price: getRandomPositiveInteger(25000, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 4),
      guest: getRandomPositiveInteger(1, 4),
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

const objectGenerator = new Array(10).fill(null).map(createAdvertisement);

export {objectGenerator};
