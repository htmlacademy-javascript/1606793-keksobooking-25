import {debounce} from './utils';

const MAX_MARKERS_AMOUNT = 10;

const housingTypeInput = document.querySelector('[name="housing-type"]');
const housingPriceInput = document.querySelector('[name="housing-price"]');
const housingRoomsInput = document.querySelector('[name="housing-rooms"]');
const housingGuestsInput = document.querySelector('[name="housing-guests"]');
const wifiInput = document.querySelector('[value="wifi"]');
const dishwasherInput = document.querySelector('[value="dishwasher"]');
const parkingInput = document.querySelector('[value="parking"]');
const washerInput = document.querySelector('[value="washer"]');
const elevatorInput = document.querySelector('[value="elevator"]');
const conditionerInput = document.querySelector('[value="conditioner"]');

let cachedAdverts = [];
const initAdvertsCache = (adverts) => cachedAdverts = adverts;

const filterByHousingType = (housingType) => (advert) => {
  return housingType === 'any'
    ? true
    : housingType === advert.offer.type;
};

const filterByPrice = (housingPrice) => (advert) => {
  return housingPrice === 'any'
    ? true
    : housingPrice === advert.offer.price;
};

const filterByExpectedRooms = (expectedRooms) => (advert) => {
  return expectedRooms === 'any'
    ? true
    : expectedRooms === advert.offer.rooms;
};

const filterByExpectedGuests = (expectedGuests) => (advert) => {
  return expectedGuests === 'any'
    ? true
    : expectedGuests === advert.offer.guests;
};

const filterByFeatures = (filterByFeature) => {
  if (wifiInput.checked) {
    filterByFeature('wifi');
  }
  if (dishwasherInput.checked) {
    filterByFeature('dishwasher');
  }
  if (parkingInput.checked) {
    filterByFeature('parking');
  }
  if (washerInput.checked) {
    filterByFeature('washer');
  }
  if (conditionerInput.checked) {
    filterByFeature('conditioner');
  }
  if (elevatorInput.checked) {
    filterByFeature('elevator');
  }
};

const filterAdverts = () => {
  return cachedAdverts
    .filter(filterByHousingType(housingTypeInput.value))
    .filter(filterByPrice(housingPriceInput.value))
    .filter(filterByExpectedRooms(housingRoomsInput.value))
    .filter(filterByExpectedGuests(housingGuestsInput.value))
    .filter(filterByFeatures)
    .slice(0, MAX_MARKERS_AMOUNT);
};

const onChange = (input) => {
  input.addEventListener('change', debounce(filterAdverts, 500));
};

onChange(housingTypeInput);
onChange(housingPriceInput);
onChange(housingRoomsInput);
onChange(housingGuestsInput);
onChange(wifiInput);
onChange(dishwasherInput);
onChange(parkingInput);
onChange(washerInput);
onChange(conditionerInput);
onChange(elevatorInput);

export {filterAdverts, initAdvertsCache};
