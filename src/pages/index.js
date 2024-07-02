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
const avatarFormElement = document.querySelector("#change-profilepic-form");

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
  .catch(console.error);

//edit profile information

function handleProfileFormSubmit(userData) {
  profilePopupForm.setLoading(true);
  api
    .editProfile(userData)
    .then((res) => {
      profilePopupForm.close();
      return res;
    })
    .then((res) => userInfo.setUserInfo(res))
    .catch(console.error)
    .finally(() => profilePopupForm.setLoading(false));
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
  avatarFormValidator.resetValidation();
});

function handleProfilePictureFormSubmit(userData) {
  profileImagePopupForm.setLoading(true);
  api
    .updateProfilePicture(userData.profileurl)
    .then((res) => {
      avatarFormElement.reset();
      profileImagePopupForm.close();
      userInfo.setUserImage(res.avatar);
    })
    .catch(console.error)
    .finally(() => profileImagePopupForm.setLoading(false));
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
  cardPopupForm.setLoading(true);
  api
    .addCard(userInfo)
    .then((res) => {
      cardList.addItem(res);
    })
    .then(() => {
      cardFormElement.reset();
      cardPopupForm.close();
    })
    .catch(console.error)
    .finally(() => cardPopupForm.setLoading(false));
}

const deleteConfirmPopup = new popupWithConfirmation("#confirm-modal");
deleteConfirmPopup.setEventListeners();

function handleDeleteClick(card) {
  deleteConfirmPopup.open();

  deleteConfirmPopup.setSubmitAction(() => {
    deleteConfirmPopup.setLoading(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        deleteConfirmPopup.close();
      })
      .catch(console.error)
      .finally(() => deleteConfirmPopup.setLoading(false));
  });
}

function handleLikeClick(card) {
  if (card.getLikes() === true) {
    api
      .dislikeCard(card.getId())
      .then((res) => {
        card.renderLikes(res.isLiked);
      })
      .catch(console.error);
  } else {
    api
      .likeCard(card.getId())
      .then((res) => {
        card.renderLikes(res.isLiked);
      })
      .catch(console.error);
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

newCardButton.addEventListener("click", () => {
  cardPopupForm.open();
  cardFormValidator.resetValidation();
});

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

const avatarFormValidator = new FormValidation(
  formValidationConfig,
  avatarFormElement
);
avatarFormValidator.enableValidation();
