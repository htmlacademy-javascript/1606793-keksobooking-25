const priceSlider = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

const initPriceSlider = (onPriceUpdate) => {
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

  priceSlider.noUiSlider.on('slide', () => {
    onPriceUpdate(priceSlider.noUiSlider.get());
  });

  priceInput.addEventListener('input', function () {
    priceSlider.noUiSlider.set(this.value);
  });
};

export {initPriceSlider};

