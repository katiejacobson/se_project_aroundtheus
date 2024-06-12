import "../pages/index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidation from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";

//Wrappers
const galleryCards = document.querySelector(".gallery__cards");
const profileEditModal = document.querySelector("#edit-modal");
const profileFormElement = document.querySelector("#profile-form");
const cardFormElement = document.querySelector("#add-card-form");

//Buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");

//Form data
const nameInput = profileEditModal.querySelector("#profile-title");
const jobInput = profileEditModal.querySelector("#description");

//profile form
const userInfo = new UserInfo(".profile__title", ".profile__description");

function handleProfileFormSubmit(userData) {
  profilePopupForm.close();
  userInfo.setUserInfo(userData);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
}

function handleNewCardFormSubmit(userInfo) {
  const name = userInfo.title;
  const link = userInfo.url;
  const newCard = new Section(
    {
      items: { name, link },
      renderer: createCard,
    },
    galleryCards
  );
  newCard.addItem();
  cardFormValidator.toggleButtonState();
  cardPopupForm.close();
}

function handleImageClick(data) {
  //new Popup with Image
  const popupWithImage = new PopupWithImage("#image-modal");
  popupWithImage.setEventListeners();
  popupWithImage.open(data);
}

//new profile popup

const profilePopupForm = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);
profilePopupForm.setEventListeners();

//new card popup
const cardPopupForm = new PopupWithForm("#card-modal", handleNewCardFormSubmit);
cardPopupForm.setEventListeners();

//Event Listeners
profileEditButton.addEventListener("click", () => {
  profilePopupForm.open();
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.title;
  jobInput.value = currentUserInfo.description;
  editFormValidator.resetValidation();
});

newCardButton.addEventListener("click", () => cardPopupForm.open());

//Create new cards - new code
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  galleryCards
);

defaultCardList.renderItems();

//Form Validation

const formValidationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidation(
  formValidationConfig,
  profileFormElement
);

editFormValidator.enableValidation();

const cardFormValidator = new FormValidation(
  formValidationConfig,
  cardFormElement
);

cardFormValidator.enableValidation();
