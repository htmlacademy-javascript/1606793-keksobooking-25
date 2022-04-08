import {getOrdinal} from './utils.js';
import {OFFER_FLAT, OFFER_BUNGALOW, OFFER_HOUSE, OFFER_PALACE, OFFER_HOTEL} from './const.js';

const offerTypes = {
  [OFFER_FLAT] : 'Квартира',
  [OFFER_BUNGALOW] : 'Бунгало',
  [OFFER_HOUSE] : 'Дом',
  [OFFER_PALACE] : 'Дворец',
  [OFFER_HOTEL] : 'Отель',
};

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
  const popupPhotos = advertisementElement.querySelector('.popup__photos');
  const photoElement = popupPhotos.querySelector('.popup__photo');

  for (let index = 0; index < links.length; index++) {
    const nextPhotoElement = photoElement.cloneNode();
    photoElement.remove();
    popupPhotos.appendChild(nextPhotoElement);
    nextPhotoElement.src = links[index];
  }
};

function createPopup (ads) {
  const advertisementElement = cardTemplate.cloneNode(true);
  advertisementElement.querySelector('.popup__title').textContent = ads.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = ads.offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = ads.offer.price;
  advertisementElement.querySelector('.popup__type').textContent = offerTypes[ads.offer.type];
  const roomOrdinal = getOrdinal(ads.offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guestOrdinal = getOrdinal(ads.offer.guests, ['гостя', 'гостей', 'гостей']);
  advertisementElement.querySelector('.popup__text--capacity').textContent = `${ads.offer.rooms} ${roomOrdinal} для ${ads.offer.guests} ${guestOrdinal}`;
  advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${ads.offer.checkin}, выезд после ${ads.offer.checkout}`;
  if (ads.offer.features) {
    renderFeatures(advertisementElement, ads.offer.features);
  }
  advertisementElement.querySelector('.popup__description').textContent = ads.offer.description;
  advertisementElement.querySelector('.popup__avatar').src = ads.author.avatar;
  if (ads.offer.photos) {
    renderPhotos(advertisementElement, ads.offer.photos);
  }

  return advertisementElement;
}

export {createPopup};
