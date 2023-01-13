import './index.css';
import elements from '../utils/data.js';
import { config } from '../utils/data.js';
import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { editBtn, addBtn, nameInput, captionInput, formEditElem, formAddElem } from '../utils/elements.js';

// рендеринг начальных 6 карточек
const cardsList = new Section({
  items: elements,
  renderer: (cardItem) => {
    cardsList.addItem(createCard(cardItem));
  },
}, '.elements'
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
function handleImageClick(title, image, alt) {
  popupWithImage.open(title, image, alt);
}

// попап с большой картинкой
const popupWithImage = new PopupWithImage('.popup_type_big-image');
popupWithImage.setEventListeners();

// экземпляр класса UserInfo
const profileInputValues = new UserInfo( '.profile__name', '.profile__caption' );

// попап редактирования профиля
const popupWithEditForm = new PopupWithForm('.popup_type_edit-profile', 
  (inputValues) => {
    profileInputValues.setUserInfo(inputValues);
    popupWithEditForm.close();
  }
)
popupWithEditForm.setEventListeners();

// попап добавления новой картинки
const popupWithAddForm = new PopupWithForm('.popup_type_add-card', 
  (inputValues) => {
    const card = { title: inputValues.title, src: inputValues.link, alt: inputValues.title };
    const cardElem = createCard(card);
    cardsList.addItem(cardElem);
    popupWithAddForm.close();
  }
)
popupWithAddForm.setEventListeners();

// слушатель на кнопку открытия попапа редактирования профиля
editBtn.addEventListener('click', () => {
  validationFormEditCard.resetValidation();
  popupWithEditForm.open();
  nameInput.value = profileInputValues.getUserInfo().name;
  captionInput.value = profileInputValues.getUserInfo().caption;
});

// слушатель на кнопку открытия попапа добавления новой картинки
addBtn.addEventListener('click', () => {
  validationFormAddCard.resetValidation();
  popupWithAddForm.open();
})
