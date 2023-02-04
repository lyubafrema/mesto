import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formElem = this._popup.querySelector('.form');
    this._formBtn = this._popup.querySelector('.form__save-button');
  }

  // собираем данные из инпутов
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // подставляем данные в инпуты
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const initialText = this._formBtn.textContent;
      this._formBtn.textContent = 'Сохранение...';

      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this._formBtn.textContent = initialText;
        })
    });
  }

  close() {
    super.close();
    this._formElem.reset();
  }
}
