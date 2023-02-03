import Popup from "./Popup";
export default class PopupWithCheck extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._confirmBtn = this._popup.querySelector('.form__save-button_size_s');
    this._initialBtn = this._confirmBtn.textContent;
  }

  // колбек-функция попапа подтверждения удаления
  handleCardDelete(callback) {
    this._handleCardDeleteCallBack = callback;
  }

  setRenderLoading() {
    this._confirmBtn.textContent = 'Подождите...';
  }

  unsetRenderLoading() {
    this._confirmBtn.textContent = this._initialBtn;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmBtn.addEventListener('click', () => {
      this._handleCardDeleteCallBack();
    });
  }
}
