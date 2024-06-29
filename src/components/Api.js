export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`'Error:' ${res.status}`);
    }
  }

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.renderResult);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.renderResult);
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this.renderResult);
  }

  updateAvatar() {}

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.url,
      }),
    }).then(this.renderResult);
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.renderResult);
  }

  likeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.renderResult);
  }

  dislikeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.renderResult);
  }
}
