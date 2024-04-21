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

//Buttons and other DOM nodes
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);
const newCardButton = document.querySelector(".profile__add-button");
const newCardCloseButton = cardEditModal.querySelector(".modal__close-button");

//Form data
const nameInput = profileEditModal.querySelector("#title");
const jobInput = profileEditModal.querySelector("#description");

const cardTitleInput = cardEditModal.querySelector("#title");
const cardImageInput = cardEditModal.querySelector("#url");

//Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
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
  renderCard({ name, link }, galleryCards);
  closeModal(cardEditModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = data.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  //find delete button
  //add Event Listener to delete button
  // cardElement.remove()

  //add a clickListener to clickImage element
  //openModal with previewImageModal (add into HTML)
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  galleryCards.prepend(cardElement);
}

//Event Listeners
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

newCardButton.addEventListener("click", () => openModal(cardEditModal));
newCardCloseButton.addEventListener("click", () => closeModal(cardEditModal));

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFormElement.addEventListener("submit", handleNewCardFormSubmit);

//Display cards
initialCards.forEach((cardData) => renderCard(cardData, galleryCards));
