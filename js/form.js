import {
  CAPACITY_GUESTS_1,
  CAPACITY_GUESTS_2,
  CAPACITY_GUESTS_3,
  CAPACITY_GUESTS_100,
  CAPACITY_NOT_FOR_GUESTS} from './const.js';

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilterSelects = mapFilters.querySelectorAll('select');
const mapFeatures = document.querySelector('.map__features');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const roomsOptions = {
  [CAPACITY_GUESTS_1]: [CAPACITY_GUESTS_1],
  [CAPACITY_GUESTS_2]: [CAPACITY_GUESTS_2, CAPACITY_GUESTS_1],
  [CAPACITY_GUESTS_3]: [CAPACITY_GUESTS_3, CAPACITY_GUESTS_2, CAPACITY_GUESTS_1],
  [CAPACITY_GUESTS_100]: CAPACITY_NOT_FOR_GUESTS,
};

function validateOptions () {
  return roomsOptions[roomsField.value].includes(capacityField.value);
}

function getOptionsErrorMessage () {
  return `
  ${roomsField.value}
  ${roomsField.value === capacityField.value ? ['не доступна '] + capacityField.value : ['не доступны '] + capacityField.value}
  `;
}

pristine.addValidator(roomsField, validateOptions, getOptionsErrorMessage);

adForm.addEventListener('submit',  (evt) => {
  evt.preventDefault();
  pristine.validate();
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
