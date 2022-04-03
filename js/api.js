import {showSuccessPopup, showErrorPopup} from './form-send.js';

const getAdvertisements = (onSuccess, onError) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
    },
  )
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendForm = () => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: new FormData,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessPopup();
      } // else {
      //showErrorPopup();
      //}
    })
    .catch(() => {
      showErrorPopup();
    });
};

export {getAdvertisements, sendForm};
