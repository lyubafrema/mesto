//глобальные переменные

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const popupEditElem = document.querySelector('.popup_type_edit-profile');
const popupAddElem = document.querySelector('.popup_type_add-card');
const popupBigImageElem = document.querySelector('.popup_type_big-image');

const nameInput = document.querySelector('.popup__input_type_name');
const captionInput = document.querySelector('.popup__input_type_caption');

const nameProfile = document.querySelector('.profile__name');
const captionProfile = document.querySelector('.profile__caption');

const formEditElem = document.querySelector('.form_edit-profile');
const formAddElem = document.querySelector('.form_add-card');

const cardContainer = document.querySelector('.elements');

export { editBtn, addBtn, popupEditElem, popupAddElem, popupBigImageElem, nameInput, captionInput, nameProfile, captionProfile, formEditElem, formAddElem, cardContainer }
