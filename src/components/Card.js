export default class Card {
  constructor(data, selector, handleImageClick) {
    this._title = data.title;
    this._image = data.src;
    this._alt = data.alt;
    this._selector = selector;
    this._handleImageClick = handleImageClick;
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
    this._likeBtn = this._element.querySelector('.element__like');
    this._deleteBtn = this._element.querySelector('.element__delete');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');

    this._deleteBtn.addEventListener('click', () => {
      this._deleteCard()
    });

    this._likeBtn.addEventListener('click', () => {
      this._toggleLike()
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._title, this._image)
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleLike() {
    this._likeBtn.classList.toggle('element__like_active');
  }

  _setData() {
    this._cardImage.src = this._image;
    this._cardImage.alt = this._alt;
    this._cardTitle.textContent = this._title;
  }

  generateElement() {
    this._getElement();
    this._setEventListeners();
    this._setData();

    return this._element;
  }
}
