export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // не знаю, можно ли так сделать, но решила убрать повторения кода в такую функцию
  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    console.log('Произошла какая-то ошибка');
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  // загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // редактирование профиля
  editProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._handleResponse);
  }

  // добавление новой карточки
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._handleResponse);
  }

  // удаление своей карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id} `, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // поставить лайк
  setLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // убрать лайк
  unsetLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  // сменить аватар
  changeAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._handleResponse);
  }
}
