import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonValue = this._submitButton.textContent;
  }

  _getInputValues() {
    const formInputs = {};
    this._inputList.forEach((input) => {
      formInputs[input.name] = input.value;
    });
    return formInputs;
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
      const userInfo = this._getInputValues();
      this._handleFormSubmit(userInfo);
      evt.target.reset();
    });
  }
}
