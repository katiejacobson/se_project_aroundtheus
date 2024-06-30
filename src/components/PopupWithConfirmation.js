import Popup from "./Popup.js";

export default class PopupWithFormSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(
      ".modal__button_confirm"
    );
    this._submitButtonValue = this._submitButton.textContent;
  }

  setSubmitAction(action) {
    this._submitAction = action;
  }

  setLoading(isLoading, buttonValue) {
    this._submitButton.textContent = isLoading
      ? buttonValue
      : this._submitButtonValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitAction();
    });
  }
}
