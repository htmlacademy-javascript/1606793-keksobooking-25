const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const photoPreview = document.querySelector('.ad-form__photo');
const photoUpload = document.querySelector('#images');
const photoElement = document.createElement('img');

const uploadPhotos = () => {
  photoUpload.addEventListener('change', () => {
    const file = photoUpload.files[0];
    const fileName = file.name.toLowerCase();
    photoElement.style.width = '70px';
    photoElement.style.height = '70px';
    photoPreview.appendChild(photoElement);

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      photoElement.src = URL.createObjectURL(file);
    }
  });
};

export {uploadPhotos, photoElement};
