import {COORDINATES_TOKYO} from './const.js';
import {coordinatesToAddress} from './utils.js';
import {initMap} from './map.js';
import {initForm, disableForm, enableForm, updatePrice, updateAddress} from './form.js';
import {initPriceSlider} from './price-slider.js';

const onMapLoad = () => {
  enableForm();
  updateAddress(
    coordinatesToAddress(COORDINATES_TOKYO.LAT, COORDINATES_TOKYO.LNG)
  );
};

initForm();
disableForm();
initMap(
  onMapLoad,
  (lat, lng) => updateAddress(coordinatesToAddress(lat, lng))
);
initPriceSlider(updatePrice);
