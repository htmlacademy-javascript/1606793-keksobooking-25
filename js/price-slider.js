import {priceField} from './form.js';

const priceSlider = document.querySelector('.ad-form__slider');

noUiSlider.create(priceSlider, {
  start: 0,
  connect: 'lower',
  step: 1000,
  range: {
    'min': 0,
    'max': 100000,
  },
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

priceSlider.noUiSlider.on('update', () => {
  priceField.value = priceSlider.noUiSlider.get();
});

