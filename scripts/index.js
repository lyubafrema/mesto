let editElem = document.querySelector('.profile__edit-button');
let popupElem = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let captionInput = document.querySelector('.popup__input_type_caption');
let nameProfile = document.querySelector('.profile__name');
let captionProfile = document.querySelector('.profile__caption');
let formElem = document.querySelector('.form');

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
