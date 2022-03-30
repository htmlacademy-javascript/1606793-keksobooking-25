import {enableForm, disableForm} from './form.js';
import {advertisements} from './data.js';
import {createPopup} from './card.js';

disableForm();

const addressInput = document.querySelector('#address');

const coordinatesTokyo = {
  lat: 35.68491,
  lng: 139.76771,
};
const valuesTokyo = Object.values(coordinatesTokyo).join(', ');

const map = L.map('map-canvas').on('load', () => {
  enableForm();
  addressInput.value = valuesTokyo;})
  .setView({
    lat: coordinatesTokyo.lat,
    lng: coordinatesTokyo.lng,
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
    lat: coordinatesTokyo.lat,
    lng: coordinatesTokyo.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat;
  const lng = latLng.lng;
  addressInput.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
});

advertisements.forEach((advert) => {
  const lat = advert.location.lat;
  const lng = advert.location.lng;
  L.marker(
    {lat: lat, lng: lng,},
    {icon: commonPinIcon, keepInView: true,})
    .bindPopup(createPopup(advert))
    .addTo(map);
});
