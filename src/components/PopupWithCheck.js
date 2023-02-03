import Popup from "./Popup";
export default class PopupWithCheck extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._checkBtn = this._popup.querySelector('.popup__check-button');
    this._initialBtn = this._checkBtn.textContent;
  }

  // колбек-функция попапа подтверждения удаления
  handleCardDelete(callback) {
    this._handleCardDeleteCallBack = callback;
  }

  setRenderLoading() {
    this._checkBtn.textContent = 'Подождите...';
  }

  unsetRenderLoading() {
    this._checkBtn.textContent = this._initialBtn;
  }

  setEventListeners() {
    super.setEventListeners();
    this._checkBtn.addEventListener('click', () => {
      this._handleCardDeleteCallBack();
    });
  }
}
