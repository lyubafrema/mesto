export default class UserInfo {
  constructor(nameSelector, captionSelector) {
    this._nameProfileText = document.querySelector(nameSelector);
    this._aboutProfileText = document.querySelector(captionSelector);
  }

  // нужен чтобы подставить данные профиля при открытии формы
  getUserInfo() {
    return {
      name: this._nameProfileText.textContent,
      about: this._aboutProfileText.textContent,
    }
  }
  // добавляем новые данные профиля на страницу
  setUserInfo({ name, about }) {
    this._nameProfileText.textContent = name;
    this._aboutProfileText.textContent = about;
  }
}
