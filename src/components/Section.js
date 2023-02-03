export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // измененный метод для рендеринга карточек, теперь он может принимать объект из промиса
  renderItems(initialCards) {
    initialCards.forEach(cards => {
      const { name, link, likes, _id, owner } = cards;
      const cardsObj = { name, link, likes, _id, owner };
      this._renderer(cardsObj);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
