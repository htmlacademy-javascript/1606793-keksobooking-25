import {debounce} from './utils.js';
import {renderMapMarkers} from './map.js';

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
const initAdvertsCache = (adverts) => {cachedAdverts = adverts;};

const filterByHousingType = (housingType) => (advert) => housingType === 'any'
  ? true
  : housingType === advert.offer.type;

const filterByPrice = (housingPriceType) => (advert) => {
  if (housingPriceType === 'any') {
    return true;
  }

  const price = advert.offer.price;

  if (housingPriceType === 'low') {
    return price < 10000;
  }

  if (housingPriceType === 'middle') {
    return 10000 <= price && price < 50000;
  }

  if (housingPriceType === 'high') {
    return price >= 50000;
  }
};

const filterByExpectedRooms = (expectedRooms) => (advert) => expectedRooms === 'any'
  ? true
  : +expectedRooms === +advert.offer.rooms;

const filterByExpectedGuests = (expectedGuests) => (advert) => {
  if (expectedGuests === 'any') {
    return true;
  }
  return +expectedGuests <= +advert.offer.guests;
};

const filterByFeatures = (feature, isChecked) => (advert) => {
  if (!isChecked) {
    return true;
  }
  const features = advert.offer.features;
  if (!features) {
    return false;
  }
  return features.includes(feature);
};

const filterAdverts = () => cachedAdverts
  .filter(filterByHousingType(housingTypeInput.value))
  .filter(filterByPrice(housingPriceInput.value))
  .filter(filterByExpectedRooms(housingRoomsInput.value))
  .filter(filterByExpectedGuests(housingGuestsInput.value))
  .filter(filterByFeatures('wifi', wifiInput.checked))
  .filter(filterByFeatures('dishwasher', dishwasherInput.checked))
  .filter(filterByFeatures('parking', parkingInput.checked))
  .filter(filterByFeatures('washer', washerInput.checked))
  .filter(filterByFeatures('conditioner', conditionerInput.checked))
  .filter(filterByFeatures('elevator', elevatorInput.checked))
  .slice(0, MAX_MARKERS_AMOUNT);

const onChange = (input) => {
  input.addEventListener('change', debounce(() => renderMapMarkers()), 500);
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
