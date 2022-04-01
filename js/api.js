const getAdvertisements = () =>
fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });


export {getAdvertisements};
