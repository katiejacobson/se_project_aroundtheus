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

//information from server

let cardList;
let userInfo;

api
  .loadPageResults()
  .then(([cards, userData]) => {
    console.log(cards);
    console.log(userData);
    cardList = new Section(
      {
        items: cards,
        renderer: createCard,
      },
      ".gallery__cards"
    );
    cardList.renderItems();
    userInfo = new UserInfo(
      ".profile__title",
      ".profile__description",
      ".profile__image"
    );
    userInfo.setUserInfo(userData);
  })
  .catch((err) => console.error(err));

//Render Loading
function renderLoading(isLoading) {
  if (isLoading) {
  }
}

//edit profile information

function handleProfileFormSubmit(userData) {
  profilePopupForm.setLoading(true, "Saving...");
  api
    .editProfile(userData)
    .then((res) => {
      profilePopupForm.close();
      api.getInfo();
      return res;
    })
    .then((res) => userInfo.setUserInfo(res))
    .catch((err) => console.error(err))
    .finally(() => profilePopupForm.setLoading(false, "Save"));
}

const profilePopupForm = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);
profilePopupForm.setEventListeners();

//edit profile image

const profileImagePopupForm = new PopupWithForm(
  "#picture-modal",
  handleProfilePictureFormSubmit
);
profileImagePopupForm.setEventListeners();

const profileImageEditButton = document.querySelector(
  ".profile-image__edit-button"
);

profileImageEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  profileImagePopupForm.open();
});

function handleProfilePictureFormSubmit(userData) {
  profileImagePopupForm.setLoading(true, "Saving...");
  api
    .updateProfilePicture(userData.profileurl)
    .then((res) => {
      profileImagePopupForm.close();
      userInfo.setUserImage(res.avatar);
    })
    .catch((err) => console.error(err))
    .finally(() => profilePopupForm.setLoading(false, "Save"));
}

//Edit Cards

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.generateCard();
}

const cardPopupForm = new PopupWithForm("#card-modal", handleNewCardFormSubmit);
cardPopupForm.setEventListeners();

function handleNewCardFormSubmit(userInfo) {
  cardPopupForm.setLoading(true, "Saving...");
  api
    .addCard(userInfo)
    .then((res) => {
      cardList.addItem(res);
    })
    .then(cardPopupForm.close())
    .catch((err) => console.error(err))
    .finally(() => cardPopupForm.setLoading(false, "Create"));
}

const deleteConfirmPopup = new popupWithConfirmation("#confirm-modal");
deleteConfirmPopup.setEventListeners();

function handleDeleteClick(card) {
  deleteConfirmPopup.open();

  deleteConfirmPopup.setSubmitAction(() =>
    api
      .deleteCard(card.getId())
      .then(() => {
        deleteConfirmPopup.setLoading(true, "Saving...");
        card.removeCard();
        deleteConfirmPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => deleteConfirmPopup.setLoading(false, "Yes"))
  );
}

function handleLikeClick(card) {
  if (card.getLikes() === true) {
    api
      .dislikeCard(card.getId())
      .then((res) => {
        card.renderLikes(res.isLiked);
      })
      .catch((err) => console.error(err));
  } else {
    api
      .likeCard(card.getId())
      .then((res) => {
        card.renderLikes(res.isLiked);
      })
      .catch((err) => console.error(err));
  }
}

//Preview Images
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

//Validation
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
