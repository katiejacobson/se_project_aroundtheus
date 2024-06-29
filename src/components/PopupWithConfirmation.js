import Popup from "./Popup.js";

export default class PopupWithFormSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  setSubmitAction(action) {
    this._submitAction = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitAction();
    });
  }
}
