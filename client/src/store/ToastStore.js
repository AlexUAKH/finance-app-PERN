import { makeAutoObservable } from "mobx";

export default class ToastStore {
  constructor() {
    this._toast = {};
    this._isShow = false;
    makeAutoObservable(this);
  }

  setToast(message, type = "success") {
    this._toast = { message, type };
    this.setShow(true)
  }
  get toast() {
    return this._toast;
  }

  setShow(val) {
    this._isShow = val;
  }
  get isShow() {
    return this._isShow;
  }
}
