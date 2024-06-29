//OOP

export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardId = data._id;
    this._isLiked = data.isLiked;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return _cardElement;
  }

  // getView() {
  //   console.log("inside get view");
  //   this._element = this._getTemplate();
  //   this._likeButton = this._element.querySelector(".card__like-button");
  //   this._cardImage = this._element.querySelector(".card__image");
  //   this._trashButton = this._element.querySelector(".card__trash-button");
  // }

  // _handleLikeButtonClick() {
  //   this._element
  //     .querySelector(".card__like-button")
  //     .classList.toggle("card__like-button_active");
  // }

  // _handleTrashButtonClick() {
  //   this._element.remove();
  // }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        // this._handleLikeButtonClick();
        console.log(this._isLiked);
        this._handleLikeClick(this);
      });

    this._element
      .querySelector(".card__trash-icon")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
        // this._handleTrashButtonClick();
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

    this.renderLikes(this._isLiked);

    return this._element;
  }

  removeCard() {
    this._element.remove();
  }

  getId() {
    return this._cardId;
  }

  getLikes() {
    return this._isLiked;
  }

  renderLikes(isLiked) {
    console.log(isLiked);
    if (isLiked === true) {
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    } else {
      this._element
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
    }
  }

  // handleLikeButtonClick() {
  //   this._element
  //     .querySelector(".card__like-button")
  //     .classList.add("card__like-button_active");
  // }

  // handleUnlikeButtonClick() {
  //   this._element
  //     .querySelector(".card__like-button")
  //     .classList.remove("card__like-button_active");
  // }
}
