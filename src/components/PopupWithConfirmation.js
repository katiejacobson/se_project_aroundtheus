import Popup from "./Popup.js";

export default class PopupWithFormSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  setSubmitAction(action) {
    this._deleteConfirmationHandler = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      this._deleteConfirmationHandler;
    });
  }
}
