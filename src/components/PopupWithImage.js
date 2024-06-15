import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImageDisplay = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._previewImageText =
      this._popupElement.querySelector(".modal__image-text");
  }

  open(data) {
    this._previewImageDisplay.src = data.link;
    this._previewImageDisplay.alt = data.name;
    this._previewImageText.textContent = data.name;
    super.open();
  }
}
