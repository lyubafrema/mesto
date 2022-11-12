const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

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

//массив карточек

const elements = [
  {
    title: 'Карачаевск',
    src: './images/karachaevsk.jpg',
    alt: ''
  },
  {
    title: 'Гора Эльбрус',
    src: './images/elbrus.png'
  },
  {
    title: 'Домбай',
    src: './images/dombay.png'
  },
  {
    title: 'Гора Эльбрус',
    src: './images/elbrus.png'
  },
  {
    title: 'Домбай',
    src: './images/dombay.png'
  },
  {
    title: 'Карачаево-Черкесия',
    src: './images/karachaevsk.jpg'
  },
];

//функцмия открытия попапа

const onOpen = (popup) => {
  popup.classList.add('popup_opened');
}

//закрытие попапа

const onClose = (popup) => {
  popup.classList.remove('popup_opened');
}

//открытие попапов по кнопке

editBtn.addEventListener('click', () => {
  onOpen(popupEditElem);
  nameInput.value = nameProfile.textContent;
  captionInput.value = captionProfile.textContent;
});

addBtn.addEventListener('click', () => {
  onOpen(popupAddElem);
});

//закрытие попапа редактирования на кнопку и оверлей

popupEditElem.addEventListener('click', function (event) {
  const isOverlay = event.target.classList.contains('popup_opened');
  const isClose = event.target.classList.contains('popup__close-button');

  if (isClose || isOverlay) {
    onClose(popupEditElem);
  }
});

//закрытие попапа добавления на кнопку и оверлей

popupAddElem.addEventListener('click', function (event) {
  const isOverlay = event.target.classList.contains('popup_opened');
  const isClose = event.target.classList.contains('popup__close-button');

  if (isClose || isOverlay) {
    onClose(popupAddElem);
  }
});

//закрытие попапа большой картинки на кнопку и оверлей

popupBigImageElem.addEventListener('click', function (event) {
  const isOverlay = event.target.classList.contains('popup_opened');
  const isClose = event.target.classList.contains('popup__close-button');

  if (isClose || isOverlay) {
    onClose(popupBigImageElem);
  }
});

//сохранение данных профиля

const handlerFormEditSubmit = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  captionProfile.textContent = captionInput.value;
  onClose(popupEditElem);
}
formEditElem.addEventListener('submit', handlerFormEditSubmit);

//шаблон карточки

const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

//удаление карточки

const handlerCardDelete = (evt) => {
  evt.target.closest('.element').remove();
}

//лайк

const handlerCardLike = (evt) => {
  evt.target.classList.toggle('element__like_active');
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

  cardImage.addEventListener('click', () => {
    onOpen(popupBigImageElem);
    const bigCardImage = document.querySelector('.big-image__image');
    bigCardImage.src = cardImage.src;
    bigCardImage.alt = cardImage.alt;

    const bidCardTitle = document.querySelector('.big-image__title');
    bidCardTitle.textContent = cardTitle.textContent;
  });

  return newCard;
}

//сохранение карточки

const handlerFormAddSubmit = (evt) => {
  evt.preventDefault();
  renderCard({ title: titleInput.value, src: srcInput.value })
  onClose(popupAddElem);
}
formAddElem.addEventListener('submit', handlerFormAddSubmit);

//добавление карточки

const renderCard = (card) => {
  cardContainer.prepend(createCard(card));
};

//рендеринг всех карточек

elements.forEach((card) => {
  renderCard(card);
});
