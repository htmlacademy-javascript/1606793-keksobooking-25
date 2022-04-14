const submitButton = document.querySelector('.ad-form__submit');

const GET_DATA_SRC = 'https://25.javascript.pages.academy/keksobooking/data';
const POST_DATA_SRC = 'https://25.javascript.pages.academy/keksobooking';

const getAdvertisements = (onSuccess, onError) => {
  fetch(GET_DATA_SRC,
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

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.classList.add('ad-form__submit--disabled');
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.classList.remove('ad-form__submit--disabled');
};

const sendForm = (onSuccess, onError, formData) => {
  disableSubmitButton();
  fetch(
    POST_DATA_SRC,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      enableSubmitButton();
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      enableSubmitButton();
      onError();
    });
};

export {getAdvertisements, sendForm};
