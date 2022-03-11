import {advertisements} from './data.js';
import {getOrdinal} from './utils.js';

const map = document.querySelector('#map-canvas');

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderFeatures = (advertisementElement, features) => {
  const featureElements = advertisementElement.querySelectorAll('.popup__feature');

  featureElements.forEach((element) => {
    element.classList.add('hidden');
  });

  features.forEach((element) => {
    advertisementElement.querySelector(`.popup__feature--${element}`).classList.remove('hidden');
  });
};

const renderPhotos = (advertisementElement, links) => {
  const photoElement = advertisementElement.querySelector('.popup__photo');
  const popupPhotos = advertisementElement.querySelector('.popup__photos');

  for (let index = 0; index < links.length-1; index++) {
    const nextPhotoElement = photoElement.cloneNode();
    popupPhotos.appendChild(nextPhotoElement);
  }
  const photoElements = advertisementElement.querySelectorAll('.popup__photo');
  photoElements.forEach((element, index) => {
    element.src = links[index];
  });
};

const offerTypesDict = {
  'flat' : 'Квартира',
  'bungalow' : 'Бунгало',
  'house' : 'Дом',
  'palace' : 'Дворец',
  'hotel' : 'Отель',
};

advertisements.forEach((ads) => {
  const advertisementElement = cardTemplate.cloneNode(true);
  advertisementElement.querySelector('.popup__title').textContent = ads.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = ads.offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = ads.offer.price;
  advertisementElement.querySelector('.popup__type').textContent = offerTypesDict[ads.offer.type];
  const roomOrdinal = getOrdinal(ads.offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guestOrdinal = getOrdinal(ads.offer.guest, ['гостя', 'гостей', 'гостей']);
  advertisementElement.querySelector('.popup__text--capacity').textContent = `${ads.offer.rooms} ${roomOrdinal} для ${ads.offer.guest} ${guestOrdinal}`;
  advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${ads.offer.checkin}, выезд после ${ads.offer.checkout}`;
  renderFeatures(advertisementElement, ads.offer.features);
  advertisementElement.querySelector('.popup__description').textContent = ads.offer.description;
  advertisementElement.querySelector('.popup__avatar').src = ads.author.avatar;
  renderPhotos(advertisementElement, ads.offer.photos);
  map.appendChild(advertisementElement);
});

