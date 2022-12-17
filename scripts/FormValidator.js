export const config = ({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active',
});

export class FormValidator {
  constructor(config, formElem) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._spanErrorClass = config.spanErrorClass;
    this._errorClass = config.errorClass;
    this._formElem = formElem;
  }

  _showInputError = (input, errorMessage) => {
    this._errorElem = this._formElem.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    this._errorElem.textContent = errorMessage;
    this._errorElem.classList.add(this._errorClass);
  }

  _hideInputError = (input) => {
    this._errorElem = this._formElem.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    this._errorElem.textContent = '';
    this._errorElem.classList.remove(this._errorClass);
  }

  _isValid = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElem.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElem.querySelector(this._submitButtonSelector);

    this._toggleButtonState(this._inputList, this._buttonElement);

    this._formElem.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(this._inputList, this._buttonElement);
      }, 0);
    });

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElem) => {
      this._setEventListeners(formElem, config);
    });
  }
}
