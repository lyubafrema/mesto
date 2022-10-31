let editElem = document.querySelector('.edit-button');
let popupElem = document.querySelector('.popup');
let nameInput = document.querySelector('.form__input-name');
let captionInput = document.querySelector('.form__input-caption');
let nameProfile = document.querySelector('.profile__name');
let captionProfile = document.querySelector('.profile__caption');
let formElem = document.querySelector('.form');
let saveElem = document.querySelector('.form__save-button');

let onOpen = function (popup) {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  captionInput.value = captionProfile.textContent;
}
let onClose = function (popup) {
  popup.classList.remove('popup_opened');
}

editElem.addEventListener('click', function () {
  onOpen(popupElem);
});

popupElem.addEventListener('click', function (event) {
  let isOverlay = event.target.classList.contains('popup_opened');
  let isClose = event.target.classList.contains('popup__close-button');

  if (isClose || isOverlay) {
    onClose(popupElem);
  }
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  captionProfile.textContent = captionInput.value;
  onClose(popupElem);
}
formElem.addEventListener('submit', formSubmitHandler);
