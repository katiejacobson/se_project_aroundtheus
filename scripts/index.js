let initialCards = [
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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal__close-button");

profileEditButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_opened");
});

const profileFormElement = document.querySelector(".modal__form");

const nameInput = document.querySelector(".modal__title");
const jobInput = document.querySelector(".modal__description");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  profileEditModal.classList.toggle("modal_opened");
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  let cardTitle = data.name;
  let cardImage = data.link;
  cardElement.querySelector(".card__title").textContent = cardTitle;
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").setAttribute("alt", cardTitle);
  return cardElement;
}

let galleryCards = document.querySelector(".gallery__cards");

for (let i = 0; i < initialCards.length; i++) {
  galleryCards.append(getCardElement(initialCards[i]));
}
