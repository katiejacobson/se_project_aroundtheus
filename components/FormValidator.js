export default class FormValidation {
  constructor(settings, inputElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputElement = inputElement;
  }

  _showInputError(inputElement, errorMessage) {
    const _errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    _errorElement.textContent = errorMessage;
    _errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const _errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    _errorElement.classList.remove(this._errorClass);
    _errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners(inputElement) {
    this._inputList = Array.from(
      inputElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = inputElement.querySelector(
      this._submitButtonSelector
    );
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    const _formList = Array.from(document.querySelectorAll(this._formSelector));
    _formList.forEach((inputElement) => {
      inputElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(inputElement);
    });
  }
}
