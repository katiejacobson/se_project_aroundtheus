export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._data = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this._data.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem({ name, link }) {
    const newCard = this._renderer({ name, link });
    this._containerSelector.prepend(newCard);
  }
}
