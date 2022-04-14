import {isEscEvent} from './utils.js';

const error = document.querySelector('#error').content.querySelector('.error');
const success = document.querySelector('#success').content.querySelector('.success');

const onSuccessKeydown = (evt) => {
  if(isEscEvent(evt)) {
    // eslint-disable-next-line no-use-before-define
    closeSuccessPopup();
  }
};

const onSuccessPopupClick = () => {
  // eslint-disable-next-line no-use-before-define
  closeSuccessPopup();
};


const onErrorKeydown = (evt) => {
  if(isEscEvent(evt)) {
    // eslint-disable-next-line no-use-before-define
    closeErrorPopup();
  }
};

const onErrorPopupClick = () => {
  // eslint-disable-next-line no-use-before-define
  closeErrorPopup();
};

const onErrorButtonClick = () => {
  // eslint-disable-next-line no-use-before-define
  closeErrorPopup();
};


const closeSuccessPopup = () => {
  const successPopup = document.querySelector('.success');
  successPopup.parentNode.removeChild(successPopup);
  document.removeEventListener('keydown', onSuccessKeydown);
  successPopup.removeEventListener('click', onSuccessPopupClick);
};


const closeErrorPopup = () => {
  const errorPopup = document.querySelector('.error');
  const errorPopupButton = document.querySelector('.error__button');

  errorPopup.parentNode.removeChild(errorPopup);
  document.removeEventListener('keydown', onErrorKeydown);
  errorPopupButton.removeEventListener('click', onErrorButtonClick);
  errorPopup.removeEventListener('click', onErrorPopupClick);
};

const showErrorPopup = (text) => {
  const errorPopup = error.cloneNode(true);
  const errorPopupButton = errorPopup.querySelector('.error__button');

  if (text) {
    errorPopup.querySelector('.error__message').textContent = text;
    errorPopup.removeChild(errorPopupButton);
  }
  document.body.appendChild(errorPopup);

  document.addEventListener('keydown', onErrorKeydown);
  errorPopupButton.removeEventListener('click', onErrorButtonClick);
  errorPopup.removeEventListener('click', onErrorPopupClick);
};

const showSuccessPopup = () => {
  const successPopup = success.cloneNode(true);
  document.body.appendChild(successPopup);

  document.addEventListener('keydown', onSuccessKeydown);
  successPopup.addEventListener('click', onSuccessPopupClick);
};

export {showSuccessPopup, showErrorPopup};
