const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarUpload = document.querySelector('#avatar');

const uploadAvatar = () => {
  avatarUpload.addEventListener('change', () => {
    const file = avatarUpload.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

export {uploadAvatar};
