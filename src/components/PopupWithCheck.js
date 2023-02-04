import Popup from "./Popup";
export default class PopupWithCheck extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._checkBtn = this._popup.querySelector('.popup__check-button');
  }

  // колбек-функция попапа подтверждения удаления
  handleCardDelete(callback) {
    this._handleCardDeleteCallBack = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._checkBtn.addEventListener('click', () => {
      const initialText = this._checkBtn.textContent;
      this._checkBtn.textContent = 'Подождите...';

      this._handleCardDeleteCallBack()
        .then(() => this.close())
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this._checkBtn.textContent = initialText;
        })
    });
  }
}
