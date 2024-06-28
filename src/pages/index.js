import "../pages/index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import popupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import FormValidation from "../components/FormValidator.js";
import { initialCards, formValidationConfig } from "../utils/constants.js";
import Api from "../components/Api.js";

//Wrappers
const profileEditModal = document.querySelector("#edit-modal");
const profileFormElement = document.querySelector("#profile-form");
const cardFormElement = document.querySelector("#add-card-form");

//Buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
const confirmButton = document.querySelector("#confirm-modal");

//Form data
const nameInput = profileEditModal.querySelector("#profile-title");
const jobInput = profileEditModal.querySelector("#description");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9a1167a0-01e6-4e49-b3c5-e813c03c355c",
    "Content-Type": "application/json",
  },
});

//profile information from server

const userInfo = new UserInfo(".profile__title", ".profile__description");

api
  .getInfo()
  .then((res) => userInfo.setUserInfo(res))
  .catch((err) => console.error(err));

//profile form

function handleProfileFormSubmit(userData) {
  profilePopupForm.close();
  userInfo.setUserInfo(userData);
  api.editProfile(userData);
}

const profilePopupForm = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);
profilePopupForm.setEventListeners();

//Cards

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteClick
  );
  return card.generateCard();
}

let cardList;

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cardList = new Section(
      {
        items: cards,
        renderer: createCard,
      },
      ".gallery__cards"
    );
    cardList.renderItems();
  })
  .catch((err) => console.error(err));

//create card
const cardPopupForm = new PopupWithForm("#card-modal", handleNewCardFormSubmit);
cardPopupForm.setEventListeners();

function handleNewCardFormSubmit(userInfo) {
  api
    .addCard(userInfo)
    .then((res) => {
      cardList.addItem(res);
    })
    .then(cardPopupForm.close())
    .catch((err) => console.error(err));
  // const name = userInfo.title;
  // const link = userInfo.url;
  // cardList.addItem({ name, link });
  // cardFormValidator.disableSubmitButton();
  // cardPopupForm.close();
  // cardFormElement.reset();
}

//delete card

const deleteConfirmPopup = new popupWithConfirmation("#confirm-modal");
deleteConfirmPopup.setEventListeners();

function handleDeleteClick(card) {
  console.log(card);
  deleteConfirmPopup.open();
  api.deleteCard(card.getId());
  // deleteConfirmPopup.setSubmitAction(() =>
  //   api
  //     .deleteCard(deleteCardId)
  //     .then(() => {
  //       console.log(card);
  //       card.removeCard();
  //       deleteConfirmPopup.close();
  //     })
  //     .catch((err) => console.error(err))
  // );
}

function handleLikeClick(id) {
  //conditional for toggle of like
}

//Create new cards - new code
// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: createCard,
//   },
//   ".gallery__cards"
// );

// cardList.renderItems();

//Preview Image
const popupWithImage = new PopupWithImage("#image-modal");
popupWithImage.setEventListeners();

function handleImageClick(data) {
  popupWithImage.open(data);
}

//Event Listeners
profileEditButton.addEventListener("click", () => {
  profilePopupForm.open();
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.title;
  jobInput.value = currentUserInfo.description;
  editFormValidator.resetValidation();
});

newCardButton.addEventListener("click", () => cardPopupForm.open());

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
