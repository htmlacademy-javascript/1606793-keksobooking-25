import {createPopup} from './card.js';
import {COORDINATES_TOKYO} from './const.js';
import {filterAdverts} from './map-filters.js';

const mapState = {
  map: null,
  commonPinIcon: null,
  mainPinIcon: null,
  mainPinMarker: null,
  markers: [],
};

const initMap = (onMapLoad, onMainPinMarkerMoved) => {
  mapState.map = L
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
  ).addTo(mapState.map);

  mapState.mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  mapState.commonPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  mapState.mainPinMarker = L.marker(
    {
      lat: COORDINATES_TOKYO.LAT,
      lng: COORDINATES_TOKYO.LNG,
    },
    {
      draggable: true,
      icon: mapState.mainPinIcon,
    }
  ).addTo(mapState.map);

  mapState.mainPinMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    onMainPinMarkerMoved(lat, lng);
  });
};

const clearMarkers = () => {
  mapState.markers.forEach((marker) => {
    mapState.map.removeLayer(marker);
  });
  mapState.markers = [];
};

const renderMapMarkers = () => {
  clearMarkers();
  const filteredAdverts = filterAdverts();
  filteredAdverts.forEach((advert) => {
    const {lat, lng} = advert.location;
    const marker = L.marker(
      {lat, lng},
      {
        icon: mapState.commonPinIcon,
        keepInView: true,
      })
      .bindPopup(createPopup(advert))
      .addTo(mapState.map);
    mapState.markers.push(marker);
  });
};

const resetMap = () => {
  mapState.map.setView({
    lat: COORDINATES_TOKYO.LAT,
    lng: COORDINATES_TOKYO.LNG,
  }, 12);
  mapState.mainPinMarker.setLatLng({
    lat: COORDINATES_TOKYO.LAT,
    lng: COORDINATES_TOKYO.LNG,
  });
};

export {initMap, renderMapMarkers, resetMap};

