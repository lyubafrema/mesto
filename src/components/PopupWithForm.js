import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formBtn = this._popup.querySelector('.form__save-button');
    this._initialFormBtn = this._formBtn.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setRenderLoading() {
    this._formBtn.textContent = 'Сохранение...';
  }

  unsetRenderLoading() {
    this._formBtn.textContent = this._initialFormBtn;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElem = this._popup.querySelector('.form');
    this._formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElem.reset();
  }
}
