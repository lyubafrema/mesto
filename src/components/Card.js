export default class Card {
  constructor(data, userId, selector, handleImageClick, { handleDeleteClick, handleSetLike, handleUnsetLike }) {
    this._title = data.name;
    this._image = data.link;
    this._alt = data.name;
    this._likesQuantity = data.likes.length;
    this._likes = data.likes;
    this._userId = userId;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._selector = selector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleSetLike = handleSetLike;
    this._handleUnsetLike = handleUnsetLike;
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
    this._likesCounter = this._element.querySelector('.element__like_counter');

    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._likeBtn.addEventListener('click', () => {
      this._isLiked ? this._handleUnsetLike(this._id) : this._handleSetLike(this._id);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._title, this._image, this._alt);
    });
  }

  // задаем состояние кнопке корзины
  _setDeleteBtn() {
    const isOwner = this._userId == this._ownerId;
    isOwner ? this._deleteBtn.style.display = 'block' : this._deleteBtn.style.display = 'none';
  }
  // задаем состояние кнопке лайка
  _setLikeBtn() {
    const hasLike = (this._likes.some((item) => item._id == this._userId));
    hasLike ? this.likeBtnActive() : this.likeBtnInactive();
  }

  // кнопка лайка активна
  likeBtnActive() {
    this._isLiked = true;
    this._likeBtn.classList.add('element__like_active');
  }

  // кнопка лайка неактивна
  likeBtnInactive() {
    this._isLiked = false;
    this._likeBtn.classList.remove('element__like_active');
  }

  // изменим количество лайков на карточке (данные возьмем уже из ответа сервера)
  setLikesQuantity(data) {
    this._likesCounter.textContent = data.likes.length;
  }

  // удаление карточки
  removeCard() {
    this._element.remove();
    this._element = null;
    this._likeBtn = null;
    this._deleteBtn = null;
    this._cardTitle = null;
  }

  // заполняем карточку содержимым
  _setData() {
    this._cardImage.src = this._image;
    this._cardImage.alt = this._alt;
    this._cardTitle.textContent = this._title;
    this._likesCounter.textContent = this._likesQuantity;
  }

  generateElement() {
    this._getElement();
    this._setEventListeners();
    this._setData();
    this._setDeleteBtn();
    this._setLikeBtn();
    return this._element;
  }
}
