import {
  CAPACITY_GUESTS_1,
  CAPACITY_GUESTS_2,
  CAPACITY_GUESTS_3,
  CAPACITY_NOT_FOR_GUESTS,
  ROOMS_AMOUNT_1,
  ROOMS_AMOUNT_2,
  ROOMS_AMOUNT_3,
  ROOMS_AMOUNT_100,
  OFFER_BUNGALOW,
  OFFER_FLAT,
  OFFER_HOTEL,
  OFFER_HOUSE,
  OFFER_PALACE,
  OFFER_BUNGALOW_MIN_PRICE,
  OFFER_FLAT_MIN_PRICE,
  OFFER_HOTEL_MIN_PRICE,
  OFFER_HOUSE_MIN_PRICE,
  OFFER_PALACE_MIN_PRICE,
} from './const.js';

// const OFFERS_MIN_PRICES = {
//   [OFFER_BUNGALOW]: [OFFER_BUNGALOW_MIN_PRICE],
//   [OFFER_FLAT]: [OFFER_FLAT_MIN_PRICE],
//   [OFFER_HOTEL]: [OFFER_HOTEL_MIN_PRICE],
//   [OFFER_HOUSE]: [OFFER_HOUSE_MIN_PRICE],
//   [OFFER_PALACE]: [OFFER_PALACE_MIN_PRICE],
// };

const ROOMS_TO_CAPACITY_RULES = {
  [ROOMS_AMOUNT_1]: [CAPACITY_GUESTS_1],
  [ROOMS_AMOUNT_2]: [CAPACITY_GUESTS_2, CAPACITY_GUESTS_1],
  [ROOMS_AMOUNT_3]: [CAPACITY_GUESTS_3, CAPACITY_GUESTS_2, CAPACITY_GUESTS_1],
  [ROOMS_AMOUNT_100]: [CAPACITY_NOT_FOR_GUESTS],
};

const ROOM_NAME_BY_VALUE = {
  [ROOMS_AMOUNT_1]: '1 комната',
  [ROOMS_AMOUNT_2]: '2 комнаты',
  [ROOMS_AMOUNT_3]: '3 комнаты',
  [ROOMS_AMOUNT_100]: '100 комнат',
};

const CAPACITY_NAME_BY_VALUE = {
  [CAPACITY_GUESTS_1]: 'для 1 гостя',
  [CAPACITY_GUESTS_2]: 'для 2 гостей',
  [CAPACITY_GUESTS_3]: 'для 3 гостей',
  [CAPACITY_NOT_FOR_GUESTS]: 'не для гостей',
};

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilterSelects = mapFilters.querySelectorAll('select');
const mapFeatures = document.querySelector('.map__features');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

// Цена за ночь

const offerTypeField = adForm.querySelector('[name="type"]');
const priceField = adForm.querySelector('[name="price"]');

// const validateOfferPrice = () => OFFERS_MIN_PRICES[+offerTypeField.value].includes(+priceField.value);

function validateOfferOptions () {
  switch (offerTypeField.value) {
    case OFFER_BUNGALOW:
      priceField.placeholder = OFFER_BUNGALOW_MIN_PRICE;
      break;
    case OFFER_FLAT:
      priceField.placeholder = OFFER_FLAT_MIN_PRICE;
      break;
    case OFFER_HOTEL:
      priceField.placeholder = OFFER_HOTEL_MIN_PRICE;
      break;
    case OFFER_HOUSE:
      priceField.placeholder = OFFER_HOUSE_MIN_PRICE;
      break;
    case OFFER_PALACE:
      priceField.placeholder = OFFER_PALACE_MIN_PRICE;
      break;
  }
}

function getOfferTypeErrorMessage () {
  return `
  ${(priceField.value < priceField.placeholder) ? ['минимальная цена'] + priceField.placeholder : ''}
  `;
}

pristine.addValidator(offerTypeField, validateOfferOptions, getOfferTypeErrorMessage);
pristine.addValidator(priceField, validateOfferOptions, getOfferTypeErrorMessage);

// Количество комнат и количество мест

const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');

let roomsValidated = false;
let capacityValidated = false;

const validateRoomsAndCapacity = () => ROOMS_TO_CAPACITY_RULES[+roomsField.value].includes(+capacityField.value);

function validateCapacityOptions () {
  if (roomsValidated && capacityValidated) {
    roomsValidated = capacityValidated = false;
  }
  const isValid = validateRoomsAndCapacity();
  if (isValid) {
    if (this === roomsField) {
      roomsValidated = true;
      if (!capacityValidated) {
        pristine.validate(capacityField);
      }
    } else if (this === capacityField) {
      capacityValidated = true;
      if (!roomsValidated) {
        pristine.validate(roomsField);
      }
    }
  }
  return isValid;
}

function getCapacityOptionsErrorMessage () {
  return `
  ${ROOM_NAME_BY_VALUE[+roomsField.value]}
  ${+roomsField.value === 1
    ? ['не доступна '] + CAPACITY_NAME_BY_VALUE[+capacityField.value]
    : ['не доступны '] + CAPACITY_NAME_BY_VALUE[+capacityField.value]}
  `;
}

pristine.addValidator(roomsField, validateCapacityOptions, getCapacityOptionsErrorMessage);
pristine.addValidator(capacityField, validateCapacityOptions, getCapacityOptionsErrorMessage);

adForm.addEventListener('submit',  (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const disableForm = () => {
  adForm.classList.add('.add-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  mapFilters.classList.add('.map__filters--disabled');
  mapFeatures.setAttribute('disabled', 'disabled');
  mapFilterSelects.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const enableForm = () => {
  adForm.classList.remove('.add-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });

  mapFilters.classList.remove('.map__filters--disabled');
  mapFeatures.removeAttribute('disabled', 'disabled');
  mapFilterSelects.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};

export {disableForm, enableForm};
