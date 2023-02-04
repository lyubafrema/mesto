export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // измененный метод для рендеринга карточек, теперь он может принимать объект из промиса
  renderItems(initialCards) {
    initialCards.forEach((cards) => {
      this._renderer(cards);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
