//OOP

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return _cardElement;
  }

  _handleLikeButtonClick() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashButtonClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButtonClick();
      });

    this._element
      .querySelector(".card__trash-icon")
      .addEventListener("click", () => {
        this._handleTrashButtonClick();
      });

    this._element
      .querySelector("#card__preview-button")
      .addEventListener("click", () => {
        this._handleImageClick(this._data);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;

    return this._element;
  }
}
