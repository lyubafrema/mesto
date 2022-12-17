import { openPopup } from './index.js'
import { popupBigImageElem, bigCardImage, bidCardTitle } from './constants.js';

export default class Card {
  constructor(data, selector) {
    this._title = data.title;
    this._image = data.src;
    this._alt = data.alt;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    this._element = cardElement;
  }

  _setEventListeners() {
    const cardDeleteBtn = this._element.querySelector('.element__delete');
    cardDeleteBtn.addEventListener('click', () => { this._deleteCard() });

    const cardLikeBtn = this._element.querySelector('.element__like');
    cardLikeBtn.addEventListener('click', () => { this._likeCard() });

    const cardImage = this._element.querySelector('.element__image');
    cardImage.addEventListener('click', () => {
      bigCardImage.src = this._image;
      bigCardImage.alt = this._alt;
      bidCardTitle.textContent = this._title;
      openPopup(popupBigImageElem);
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _setData() {
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._title;
  }

  generateElement() {
    this._getElement();
    this._setEventListeners();
    this._setData();

    return this._element;
  }
}
