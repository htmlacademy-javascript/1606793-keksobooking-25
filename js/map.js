import {getAdvertisements} from './api.js';
import {createPopup} from './card.js';
import {COORDINATES_TOKYO} from './const.js';

const ALERT_SHOW_TIME = 5000;

const initMap = (onMapLoad, onMainPinMarkerMoved) => {
  const map = L
    .map('map-canvas')
    .on('load', onMapLoad)
    .setView({
      lat: COORDINATES_TOKYO.LAT,
      lng: COORDINATES_TOKYO.LNG,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const commonPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainPinMarker = L.marker(
    {
      lat: COORDINATES_TOKYO.LAT,
      lng: COORDINATES_TOKYO.LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    onMainPinMarkerMoved(lat, lng);
  });

  const renderAdvertisements = (adverts) => {
    adverts.forEach((advert) => {
      const {lat, lng} = advert.location;
      L.marker(
        {lat, lng},
        {
          icon: commonPinIcon,
          keepInView: true,
        })
        .bindPopup(createPopup(advert))
        .addTo(map);
    });
  };

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

  getAdvertisements(renderAdvertisements, onServerError);

  // const resetMap = () => {
  //   map.setView({
  //     lat: COORDINATES_TOKYO.LAT,
  //     lng: COORDINATES_TOKYO.LNG,
  //   }, 12);
  //   mainPinMarker.setLatLng({
  //     lat: COORDINATES_TOKYO.LAT,
  //     lng: COORDINATES_TOKYO.LNG,
  //   })
  // }
};

export {initMap};

