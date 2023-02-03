import './index.css';
import { configValidation } from '../utils/data.js';
import { configApi } from '../utils/data.js';
import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { editBtn, addBtn, profileName, profileAvatar, changeAvatarElem, profileCaption, nameInput, captionInput, formEditElem, formChangeAvatar, formAddElem } from '../utils/elements.js';
import PopupWithCheck from '../components/PopupWithCheck';

// инстанс класса api
const api = new Api(configApi);

//переменная для хранения id пользователя
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, cards]) => {
    profileName.textContent = info.name;
    profileCaption.textContent = info.about;
    profileAvatar.src = info.avatar;
    userId = info._id;
    const reverseCards = cards.reverse();
    cardsList.renderItems(reverseCards);
  })
  .catch((err) => {
    console.log(err);
  });

// инстанс класса UserInfo
const profileInputValues = new UserInfo('.profile__name', '.profile__caption');

// инстанс класса Section
const cardsList = new Section({
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    cardsList.addItem(card);
  },
}, '.elements');

// функция создания новой карточки
function createCard(cardItem) {
  const card = new Card(cardItem, userId, '#element-template', handleImageClick, {
    handleDeleteClick: (id) => {
      popupWithDeleteCheck.open();
      popupWithDeleteCheck.handleCardDelete(() => {
        popupWithDeleteCheck.setRenderLoading();
        api.deleteCard(id)
          .then(() => {
            card.removeCard();
            popupWithDeleteCheck.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupWithDeleteCheck.close();
            popupWithDeleteCheck.unsetRenderLoading();
          });
      });
    },
    handleSetLike: (id) => {
      api.setLike(id)
        .then((data) => {
          card.likeBtnActive();
          card.setLikesQuantity(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleUnsetLike: (id) => {
      api.unsetLike(id)
        .then((data) => {
          card.likeBtnInactive();
          card.setLikesQuantity(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return card.generateElement();
}

// колбэк-функция открытия попапа с картинкой
function handleImageClick(title, image, alt) {
  popupWithImage.open(title, image, alt);
}

// попап с большой картинкой
const popupWithImage = new PopupWithImage('.popup_type_big-image');
popupWithImage.setEventListeners();

// попап редактирования профиля
const popupWithEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (inputValues) => {
    popupWithEditForm.setRenderLoading();
    api.editProfileInfo({ name: inputValues.name, about: inputValues.caption })
      .then((data) => {
        profileInputValues.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithEditForm.close();
        popupWithEditForm.unsetRenderLoading();
      });
  }
});
popupWithEditForm.setEventListeners();

// попап смены аватара
const popupWithAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_change-avatar',
  handleFormSubmit: (inputValues) => {
    popupWithAvatarForm.setRenderLoading();
    api.changeAvatar({ avatar: inputValues.avatar })
      .then((data) => {
        profileAvatar.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAvatarForm.close();
        popupWithAvatarForm.unsetRenderLoading();
      });
  }
});
popupWithAvatarForm.setEventListeners();

// попап добавления новой картинки
const popupWithAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (inputValues) => {
    popupWithAddForm.setRenderLoading();
    api.addNewCard({ name: inputValues.title, link: inputValues.link, alt: inputValues.title })
      .then((data) => {
        const card = createCard(data);
        cardsList.addItem(card);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAddForm.close();
        popupWithAddForm.unsetRenderLoading();
      });
  }
});
popupWithAddForm.setEventListeners();

// попап подтверждения удаления
const popupWithDeleteCheck = new PopupWithCheck({
  popupSelector: '.popup_type_delete-card'
});
popupWithDeleteCheck.setEventListeners();

// слушатель на кнопку открытия попапа редактирования профиля
editBtn.addEventListener('click', () => {
  validationFormEditCard.resetValidation();
  popupWithEditForm.open();
  const info = profileInputValues.getUserInfo();
  nameInput.value = info.name;
  captionInput.value = info.about;
});

// слушатель на аватар для открытия попапа его изменения
changeAvatarElem.addEventListener('click', () => {
  validationFormChangeAvatar.resetValidation();
  popupWithAvatarForm.open();
});

// слушатель на кнопку открытия попапа добавления новой картинки
addBtn.addEventListener('click', () => {
  validationFormAddCard.resetValidation();
  popupWithAddForm.open();
});

// включение валидации
const validationFormAddCard = new FormValidator(configValidation, formAddElem);
validationFormAddCard.enableValidation();

const validationFormChangeAvatar = new FormValidator(configValidation, formChangeAvatar);
validationFormChangeAvatar.enableValidation();

const validationFormEditCard = new FormValidator(configValidation, formEditElem);
validationFormEditCard.enableValidation();
