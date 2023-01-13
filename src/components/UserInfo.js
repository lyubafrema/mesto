export default class UserInfo {
  constructor( nameSelector, captionSelector ) {
    this._nameProfileText = document.querySelector(nameSelector);
    this._captionProfileText = document.querySelector(captionSelector);
  }
  // нужен чтобы подставить данные профиля при открытии формы
  getUserInfo() {
    return {
      name: this._nameProfileText.textContent,
      caption: this._captionProfileText.textContent,
    }
  }
  // добавляем новые данные профиля на страницу
  setUserInfo({ name, caption }) {
    this._nameProfileText.textContent = name;
    this._captionProfileText.textContent = caption;
  }
}
