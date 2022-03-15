const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilterSelects = mapFilters.querySelectorAll('select');
const mapFeatures = document.querySelector('.map__features');

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
