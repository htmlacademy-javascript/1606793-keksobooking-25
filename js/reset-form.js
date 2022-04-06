import {updateAddress} from './form.js';
import {coordinatesToAddress} from './utils.js';
import {COORDINATES_TOKYO} from './const.js';

const avatarInput = document.querySelector('#avatar');
const tilteInput = document.querySelector('#title');
const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');
const roomNumberInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');
const featuresCheckboxes = document.querySelectorAll('.features__checkbox');
const descriptionTextarea = document.querySelector('#description');
const imagesInput = document.querySelector('#images');

const AVATAR_INPUT_DEFAULT_VALUE = '';
const TITLE_INPUT_DEFAULT_VALUE = '';
const TYPE_INPUT_DEFAULT_VALUE = 'flat';
const PRICE_INPUT_DEFAULT_VALUE = '';
const TIME_INPUT_DEFAULT_VALUE = '12:00';
const ROOM_NUMBER_INPUT_DEFAULT_VALUE = '1';
const CAPACITY_INPUT_DEFAULT_VALUE = '3';
const DESCRIPTION_TEXTAREA_DEFAULT_VALUE = '';
const IMAGES_INPUT_DEFAULT_VALUE = '';

const resetForm = () => {
  avatarInput.value = AVATAR_INPUT_DEFAULT_VALUE;
  updateAddress(coordinatesToAddress(COORDINATES_TOKYO.LAT, COORDINATES_TOKYO.LNG));
  tilteInput.value = TITLE_INPUT_DEFAULT_VALUE;
  typeInput.value = TYPE_INPUT_DEFAULT_VALUE;
  priceInput.value = PRICE_INPUT_DEFAULT_VALUE;
  timeInInput.value = TIME_INPUT_DEFAULT_VALUE;
  timeOutInput.value = TIME_INPUT_DEFAULT_VALUE;
  roomNumberInput.value = ROOM_NUMBER_INPUT_DEFAULT_VALUE;
  capacityInput.value = CAPACITY_INPUT_DEFAULT_VALUE;
  featuresCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  descriptionTextarea.value = DESCRIPTION_TEXTAREA_DEFAULT_VALUE;
  imagesInput.value = IMAGES_INPUT_DEFAULT_VALUE;
};

export {resetForm};
