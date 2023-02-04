import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.big-image__image');
    this._title = this._popup.querySelector('.big-image__title');
  }
  open(title, image) {
    super.open();
    this._image.src = image;
    this._image.alt = title;
    this._title.textContent = title;
  }
}
