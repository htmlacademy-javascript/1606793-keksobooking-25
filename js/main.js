import {COORDINATES_TOKYO} from './const.js';
import {coordinatesToAddress} from './utils.js';
import {initMap, renderMapMarkers} from './map.js';
import {initForm, enableForm, updatePrice, updateAddress} from './form.js';
import {initPriceSlider} from './price-slider.js';
import {getAdvertisements} from './api.js';
import {initAdvertsCache} from './map-filters.js';
import {uploadAvatar} from './upload-avatar.js';
import {uploadPhotos} from './upload-photos.js';
uploadPhotos();
uploadAvatar();

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
  getAdvertisements((advertsFromServer) => {
    initAdvertsCache(advertsFromServer);
    renderMapMarkers();
  }, onServerError);
};

initForm();
initMap(
  onMapLoad,
  (lat, lng) => updateAddress(coordinatesToAddress(lat, lng))
);
initPriceSlider(updatePrice);
