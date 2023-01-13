import './index.css';
import elements from '../components/initialCards.js';
import { config } from '../components/FormValidator.js';
import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { editBtn, addBtn, popupEditElem, popupAddElem, nameInput, captionInput, nameProfile, captionProfile, formEditElem, formAddElem, cardContainer, popupBigImageElem } from '../components/constants.js';


// рендеринг начальных 6 карточек
const cardsList = new Section({
  items: elements,
  renderer: (cardItem) => {
    cardsList.addItem(createCard(cardItem));
  },
}, cardContainer
);
cardsList.renderItems();

// создание новой карточки
function createCard(cardItem) {
  const card = new Card(cardItem, '#element-template', handleImageClick);
  return card.generateElement();
}

// включение валидации
const validationFormAddCard = new FormValidator(config, formAddElem);
validationFormAddCard.enableValidation();

const validationFormEditCard = new FormValidator(config, formEditElem);
validationFormEditCard.enableValidation();

// колбэк-функция открытия попапа с картинкой
function handleImageClick(title, image) {
  popupWithImage.open(title, image);
}

// попап с большой картинкой
const popupWithImage = new PopupWithImage(popupBigImageElem);
popupWithImage.setEventListeners();

// экземпляр класса UserInfo
const profileInputValues = new UserInfo({ name: nameProfile, caption: captionProfile });

// попап редактирования профиля
const popupWithEditForm = new PopupWithForm(popupEditElem, {
  handleFormSubmit: (formData) => {
    profileInputValues.setUserInfo(formData);
    popupWithEditForm.close();
  }
})
popupWithEditForm.setEventListeners();

// попап добавления новой картинки
const popupWithAddForm = new PopupWithForm(popupAddElem, {
  handleFormSubmit: (formData) => {
    const card = { title: formData.title, src: formData.link };
    const cardElem = createCard(card);
    cardsList.addItem(cardElem);
    popupWithAddForm.close();
  }
});
popupWithAddForm.setEventListeners();

// слушатель на кнопку открытия попапа редактирования профиля
editBtn.addEventListener('click', () => {
  popupWithEditForm.open();
  nameInput.value = nameProfile.textContent;
  captionInput.value = captionProfile.textContent;
});

// слушатель на кнопку открытия попапа добавления новой картинки
addBtn.addEventListener('click', () => {
  popupWithAddForm.open();
})
