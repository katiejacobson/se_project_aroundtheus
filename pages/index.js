import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidation from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template").content;

//Wrappers
const galleryCards = document.querySelector(".gallery__cards");
const profileEditModal = document.querySelector("#edit-modal");
const cardEditModal = document.querySelector("#card-modal");
const profileFormElement = document.querySelector("#profile-form");
const cardFormElement = document.querySelector("#add-card-form");
const previewImageModal = document.querySelector("#image-modal");

//Buttons and other DOM nodes
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);
const newCardButton = document.querySelector(".profile__add-button");
const newCardCloseButton = cardEditModal.querySelector(".modal__close-button");
const previewImageCloseButton = previewImageModal.querySelector(
  ".modal__close-button"
);
const previewImageDisplay = previewImageModal.querySelector(
  ".modal__image-preview"
);
const previewImageText = previewImageModal.querySelector(".modal__image-text");

//Form data
const nameInput = profileEditModal.querySelector("#profile-title");
const jobInput = profileEditModal.querySelector("#description");

const cardTitleInput = cardEditModal.querySelector("#card-title");
const cardImageInput = cardEditModal.querySelector("#url");

//profile form
const userInfo = new UserInfo(".profile__title", ".profile__description");

function handleProfileFormSubmit(userInfo) {
  profilePopupForm.close();
  // profileName.textContent = userInfo.title;
  // profileJob.textContent = userInfo.description;
  userInfo.setUserInfo(userInfo);
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
  // openModal(profileEditModal);
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
