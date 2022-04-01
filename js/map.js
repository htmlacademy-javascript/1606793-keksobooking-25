import {getAdvertisements} from './api.js';
import {createPopup} from './card.js';
import {COORDINATES_TOKYO} from './const.js';

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

  getAdvertisements().forEach(() => {
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

export {initMap};
