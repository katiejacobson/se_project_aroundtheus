export default class UserInfo {
  constructor(nameSelector, jobSelector, imageSelector) {
    this._displayName = document.querySelector(nameSelector);
    this._displayJob = document.querySelector(jobSelector);
    this._displayImage = document.querySelector(imageSelector);
  }

  getUserInfo() {
    return {
      title: this._displayName.textContent,
      description: this._displayJob.textContent,
    };
  }

  setUserInfo(data) {
    this._displayName.textContent = data.name;
    this._displayJob.textContent = data.about;
    this._displayImage.src = data.avatar;
    return;
  }

  setUserImage(data) {
    this._displayImage.src = data;
  }
}
