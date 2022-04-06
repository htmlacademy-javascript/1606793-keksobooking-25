import {COORDINATES_TOKYO} from './const.js';
import {coordinatesToAddress} from './utils.js';
import {initMap, renderMapMarkers} from './map.js';
import {initForm, disableForm, enableForm, updatePrice, updateAddress} from './form.js';
import {initPriceSlider} from './price-slider.js';
import {getAdvertisements} from './api.js';

const ALERT_SHOW_TIME = 5000;

const onServerError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '29px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onMapLoad = () => {
  enableForm();
  updateAddress(
    coordinatesToAddress(COORDINATES_TOKYO.LAT, COORDINATES_TOKYO.LNG)
  );
  getAdvertisements(renderMapMarkers, onServerError);
};

initForm();
disableForm();
initMap(
  onMapLoad,
  (lat, lng) => updateAddress(coordinatesToAddress(lat, lng))
);
initPriceSlider(updatePrice);
