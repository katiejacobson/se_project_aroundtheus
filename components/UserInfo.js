export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._displayName = document.querySelector(nameSelector);
    this._displayJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      title: this._displayName.textContent,
      description: this._displayJob.textContent,
    };
  }

  setUserInfo(data) {
    //takes new user data and adds it to the page, should be called after successful submission of the profile form
    console.log("inside setUserInfo");
    console.log(data);
    console.log(this._displayName.textContent);
    this._displayName.textContent = data.title;
    this._displayJob.textContent = data.description;
    return;
  }
}
