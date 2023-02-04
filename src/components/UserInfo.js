export default class UserInfo {
  constructor(nameSelector, captionSelector, avatarSelector) {
    this._nameProfileText = document.querySelector(nameSelector);
    this._aboutProfileText = document.querySelector(captionSelector);
    this._avatarProfile = document.querySelector(avatarSelector);
  }

  // нужен чтобы подставить данные профиля при открытии формы
  getUserInfo() {
    return {
      name: this._nameProfileText.textContent,
      about: this._aboutProfileText.textContent,
    }
  }
  // добавляем данные профиля на страницу
  setUserInfo({ name, about, avatar }) {
    this._nameProfileText.textContent = name;
    this._aboutProfileText.textContent = about;
    this._avatarProfile.src = avatar;
  }
}
