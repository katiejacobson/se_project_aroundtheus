import Card from "../components/Card.js";
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

//Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileEditModal);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  const cardElement = card.generateCard();

  galleryCards.prepend(cardElement);
  evt.target.reset();
  cardFormValidator.toggleButtonState();
  closeModal(cardEditModal);
}

function handleImageClick(name, link) {
  openModal(previewImageModal);
  previewImageDisplay.src = link;
  previewImageDisplay.alt = name;
  previewImageText.textContent = name;
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

//Event Listeners
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

newCardButton.addEventListener("click", () => openModal(cardEditModal));

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFormElement.addEventListener("submit", handleNewCardFormSubmit);

const popups = document.querySelectorAll(".modal");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("modal__close-button")) {
      closeModal(popup);
    }
  });
});

//Create new cards

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();

  galleryCards.prepend(cardElement);
});

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
  "#profile-form"
);

editFormValidator.enableValidation();

const cardFormValidator = new FormValidation(
  formValidationConfig,
  "#add-card-form"
);

cardFormValidator.enableValidation();
