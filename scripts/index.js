//--------Глобальные переменные--------

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const popupAll = document.querySelectorAll('.popup');
const popupEditElem = document.querySelector('.popup_type_edit-profile');
const popupAddElem = document.querySelector('.popup_type_add-card');
const popupBigImageElem = document.querySelector('.popup_type_big-image');
const popupContainer = document.querySelector('.popup__container');

const nameInput = document.querySelector('.popup__input_type_name');
const captionInput = document.querySelector('.popup__input_type_caption');
const titleInput = document.querySelector('.popup__input_type_title');
const srcInput = document.querySelector('.popup__input_type_src');

const nameProfile = document.querySelector('.profile__name');
const captionProfile = document.querySelector('.profile__caption');

const formEditElem = document.querySelector('.form_edit-profile');
const formAddElem = document.querySelector('.form_add-card');

const cardContainer = document.querySelector('.elements');

const bigCardImage = document.querySelector('.big-image__image');
const bidCardTitle = document.querySelector('.big-image__title');

//шаблон карточки
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

//--------Объявление функций--------

//открытие попапа
const onOpen = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

//закрытие попапа на esc
const closeOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
}

//закрытие попапа
const onClose = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

//сохранение данных профиля
const handlerFormEditSubmit = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  captionProfile.textContent = captionInput.value;
  onClose(popupEditElem);
}

//удаление карточки
const handlerCardDelete = (evt) => {
  evt.target.closest('.element').remove();
}

//лайк
const handlerCardLike = (evt) => {
  evt.target.classList.toggle('element__like_active');
}

//сборка попапа с большой картинкой
const renderBigCardImage = (card) => {
  bigCardImage.src = card.src;
  bigCardImage.alt = card.alt;
  bidCardTitle.textContent = card.title;
}

//создание карточки
const createCard = (card) => {
  const newCard = elementTemplate.cloneNode(true);

  const cardImage = newCard.querySelector('.element__image');
  cardImage.src = card.src;
  cardImage.alt = card.alt;

  const cardTitle = newCard.querySelector('.element__title');
  cardTitle.textContent = card.title;

  const cardDeleteBtn = newCard.querySelector('.element__delete');
  cardDeleteBtn.addEventListener('click', handlerCardDelete);

  const cardLikeBtn = newCard.querySelector('.element__like');
  cardLikeBtn.addEventListener('click', handlerCardLike);

  //открытие попапа с большой картинкой
  cardImage.addEventListener('click', () => {
    renderBigCardImage(card);
    onOpen(popupBigImageElem);
  });

  return newCard;
}

//сохранение карточки
const handlerFormAddSubmit = (evt) => {
  evt.preventDefault();
  renderCard({ title: titleInput.value, src: srcInput.value })
  onClose(popupAddElem);
}

//добавление карточки
const renderCard = (card) => {
  cardContainer.prepend(createCard(card));
};

//-------Слушатели событий--------

//открытие попапов по кнопке
editBtn.addEventListener('click', () => {
  onOpen(popupEditElem);
  nameInput.value = nameProfile.textContent;
  captionInput.value = captionProfile.textContent;
});

addBtn.addEventListener('click', () => {
  onOpen(popupAddElem);
});

//сохранение данных профиля
formEditElem.addEventListener('submit', handlerFormEditSubmit);

//сохранение карточки
formAddElem.addEventListener('submit', handlerFormAddSubmit);


//--------Вызов функций и запуск циклов при загрузке страницы--------

//рендеринг всех карточек
elements.forEach((card) => {
  renderCard(card);
});

//закрытие попапа на кнопку и оверлей
popupAll.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const isOverlay = evt.target.classList.contains('popup_opened');
    const isClose = evt.target.classList.contains('popup__close-button');

    if (isClose || isOverlay) {
      onClose(item);
    }
  });
});
