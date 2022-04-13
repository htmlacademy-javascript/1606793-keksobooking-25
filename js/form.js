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
import {validateConnectedFormElements} from './utils.js';
import {sendForm} from './api.js';
import {showSuccessPopup, showErrorPopup} from './form-send.js';
import {resetMap} from './map.js';
import {resetForm} from './reset-form.js';
import {resetFilters} from './reset-map-filters.js';

const OFFERS_MIN_PRICES = {
  [OFFER_BUNGALOW]: [OFFER_BUNGALOW_MIN_PRICE],
  [OFFER_FLAT]: [OFFER_FLAT_MIN_PRICE],
  [OFFER_HOTEL]: [OFFER_HOTEL_MIN_PRICE],
  [OFFER_HOUSE]: [OFFER_HOUSE_MIN_PRICE],
  [OFFER_PALACE]: [OFFER_PALACE_MIN_PRICE],
};

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
const offerTypeField = adForm.querySelector('[name="type"]');
const priceField = adForm.querySelector('[name="price"]');
const addressInput = document.querySelector('#address');
const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const resetPage = document.querySelector('.ad-form__reset');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
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

const removePopup = () => {
  const popup = document.querySelector('.leaflet-popup-pane');
  popup.innerHTML = '';
};

const onFormSubmitSuccess = () => {
  showSuccessPopup();
  resetMap();
  resetFilters();
  resetForm();
  removePopup();
};

resetPage.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMap();
  resetFilters();
  resetForm();
  removePopup();
});

const initForm = () => {

  // Цена за ночь

  const validateOfferOptions = () => {
    const value = +priceField.value;
    const minValue = OFFERS_MIN_PRICES[offerTypeField.value];
    priceField.placeholder = minValue;
    return minValue <= value;
  };

  const getOfferTypeErrorMessage = () => `минимальная цена ${priceField.placeholder}`;

  validateConnectedFormElements(
    pristine,
    offerTypeField,
    priceField,
    validateOfferOptions,
    getOfferTypeErrorMessage
  );

  // Время заезда и выезда

  const timeinSelect = document.querySelector('#timein');
  const timeoutSelect = document.querySelector('#timeout');

  timeinSelect.addEventListener('change', () => {
    timeoutSelect.value = timeinSelect.value;
  });

  timeoutSelect.addEventListener('change', () => {
    timeinSelect.value = timeoutSelect.value;
  });

  // Количество комнат и количество мест

  const validateRoomsAndCapacity = () => ROOMS_TO_CAPACITY_RULES[+roomsField.value].includes(+capacityField.value);
  const getCapacityOptionsErrorMessage = () => `
  ${ROOM_NAME_BY_VALUE[+roomsField.value]}
  ${roomsField.value === 1 ? ['не доступна '] : ['не доступны ']}
  ${CAPACITY_NAME_BY_VALUE[+capacityField.value]}
`;

  validateConnectedFormElements(
    pristine,
    roomsField,
    capacityField,
    validateRoomsAndCapacity,
    getCapacityOptionsErrorMessage
  );

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendForm(
        onFormSubmitSuccess,
        showErrorPopup,
        new FormData(evt.target),
      );
    }
  });
};

const updatePrice = (newValue) => {
  priceField.value = newValue;
  pristine.validate(priceField);
};

const updateAddress = (newValue) => {
  addressInput.value = newValue;
};

export {initForm, disableForm, enableForm, updatePrice, updateAddress};
