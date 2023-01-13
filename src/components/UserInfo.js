export default class UserInfo {
  constructor({ name, caption }) {
    this._nameSelector = name;
    this._captionSelector = caption;
    this._nameInput = document.querySelector('.popup__input_type_name');
    this._captionInput = document.querySelector('.popup__input_type_caption');
  }
  // нужен чтобы подставить данные профиля при открытии формы
  getUserInfo() {
    this._profileInfo = {
      name: this._nameSelector.textContent,
      caption: this._captionSelector.textContent,
    }
    return this._profileInfo;
  }
  // добавляем новые данные профиля на страницу
  setUserInfo() {
    this._nameSelector.textContent = this._nameInput.value;
    this._captionSelector.textContent = this._captionInput.value;
  }
}
