import elements from './initialCards.js';
import { config } from './FormValidator.js';
import { FormValidator } from './FormValidator.js';
import Card from './Card.js';
import { editBtn, addBtn, popupAll, popupEditElem, popupAddElem, nameInput, captionInput, titleInput, srcInput, nameProfile, captionProfile, formEditElem, formAddElem, cardContainer, popupBigImageElem, bigCardImage, bidCardTitle } from './constants.js';

//--------Объявление функций--------

//открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

//закрытие попапа на esc
const closeOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

//открытие попапа с большой картинкой
function handleImageClick(title, image) {
  bidCardTitle.textContent = title;
  bigCardImage.src = image;
  openPopup(popupBigImageElem);
}

//сохранение данных профиля
const handleFormEditSubmit = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  captionProfile.textContent = captionInput.value;
  closePopup(popupEditElem);
}

//сохранение карточки
const handleFormAddSubmit = (evt) => {
  evt.preventDefault();
  cardContainer.prepend(createCard({ title: titleInput.value, src: srcInput.value }, '#element-template'));
  formAddElem.reset();
  closePopup(popupAddElem);
}

//создание новой карточки
const createCard = (item) => {
  const card = new Card(item, '#element-template', handleImageClick);
  const cardElement = card.generateElement();
  return cardElement;
}

//-------Слушатели событий--------

//открытие попапов по кнопке
editBtn.addEventListener('click', () => {
  openPopup(popupEditElem);
  nameInput.value = nameProfile.textContent;
  captionInput.value = captionProfile.textContent;
});

addBtn.addEventListener('click', () => {
  openPopup(popupAddElem);
});

//сохранение данных профиля
formEditElem.addEventListener('submit', handleFormEditSubmit);

//сохранение карточки
formAddElem.addEventListener('submit', handleFormAddSubmit);


//--------Вызов функций и запуск циклов при загрузке страницы--------

//закрытие попапа на кнопку и оверлей
popupAll.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const isOverlay = evt.target.classList.contains('popup_opened');
    const isClose = evt.target.classList.contains('popup__close-button');

    if (isClose || isOverlay) {
      closePopup(item);
    }
  });
});

//рендеринг всех карточек
elements.forEach((item) => {
  cardContainer.prepend(createCard(item));
});

const validationFormAddCard = new FormValidator(config, formAddElem);
validationFormAddCard.enableValidation();

const validationFormEditCard = new FormValidator(config, formEditElem);
validationFormEditCard.enableValidation();

