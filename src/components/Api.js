export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this.renderResult);
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`'Error:' ${res.status}`);
    }
  }

  getInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  editProfile(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.url,
      }),
    });
  }

  deleteCard(data) {
    return this._request(`${this._baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(data) {
    return this._request(`${this._baseUrl}/cards/${data}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  dislikeCard(data) {
    return this._request(`${this._baseUrl}/cards/${data}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  updateProfilePicture(link) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  loadPageResults() {
    return Promise.all([this.getInitialCards(), this.getInfo()]);
  }
}
