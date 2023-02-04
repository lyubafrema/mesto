/* Спасибо большое за ревью! Разобралась с моментами, которые не знала как правильно сделать.
Постаралась еще сократить дублирование кода где получилось.
Еще я добавила прелоадер, пока ждем ответа от сервера, не уверена, можно ли вынести функцию,
которая его включает, в utils, поэтому оставила здесь) */


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
import { editBtn, addBtn, changeAvatarElem, spinner, container } from '../utils/elements.js';
import PopupWithCheck from '../components/PopupWithCheck';

// инстанс класса api
const api = new Api(configApi);

//переменная для хранения id пользователя
let userId;

// функция для включения/выключения спиннера при загрузке страницы
function renderLoading(isLoading) {
  if (isLoading) {
    spinner.classList.add('spinner_visible');
    container.classList.add('container_hidden');
  } else {
    spinner.classList.remove('spinner_visible');
    container.classList.remove('container_hidden');
  }
}

renderLoading(true);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, cards]) => {
    profileInputValues.setUserInfo(info);
    userId = info._id;
    const reverseCards = cards.reverse();
    cardsList.renderItems(reverseCards);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false);
  })

// инстанс класса UserInfo
const profileInputValues = new UserInfo('.profile__name', '.profile__caption', '.profile__avatar');

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
    // обработчик удаления карточки
    handleDeleteClick: (id) => {
      popupWithDeleteCheck.open();
      popupWithDeleteCheck.handleCardDelete(() => {
        return api.deleteCard(id)
          .then(() => {
            card.removeCard();
          });
      });
    },
    // обработчик лайка
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
    // обработчик удаления лайка
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
    return api.editProfileInfo({ name: inputValues.name, about: inputValues.about })
      .then((data) => {
        profileInputValues.setUserInfo(data);
      });
  }
});
popupWithEditForm.setEventListeners();

// попап смены аватара
const popupWithAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_change-avatar',
  handleFormSubmit: (inputValues) => {
    return api.changeAvatar({ avatar: inputValues.avatar })
      .then((data) => {
        profileInputValues.setUserInfo(data);
      });
  }
});
popupWithAvatarForm.setEventListeners();

// попап добавления новой картинки
const popupWithAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (inputValues) => {
    return api.addNewCard({ name: inputValues.title, link: inputValues.link, alt: inputValues.title })
      .then((data) => {
        const card = createCard(data);
        cardsList.addItem(card);
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
  formValidators['edit-profile'].resetValidation();
  popupWithEditForm.open();
  popupWithEditForm.setInputValues(profileInputValues.getUserInfo());
});

// слушатель на аватар для открытия попапа его изменения
changeAvatarElem.addEventListener('click', () => {
  formValidators['change-avatar'].resetValidation();
  popupWithAvatarForm.open();
});

// слушатель на кнопку открытия попапа добавления новой картинки
addBtn.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupWithAddForm.open();
});

// объект для экземпляров валидаторов форм
const formValidators = {}

// включение валидации
const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(configValidation, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
enableValidation(configValidation);
