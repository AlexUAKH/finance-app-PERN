import { makeAutoObservable } from "mobx";
import axios from "axios";
import { login, registration } from "../http/userApi";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._isLoading = false;
    this._error = "";
    makeAutoObservable(this);
  }

  setIsAuth(val) {
    this._isAuth = val;
  }

  get isAuth() {
    return this._isAuth;
  }

  setUser(user) {
    this._user = user;
  }

  get user() {
    return this._user;
  }

  setIsLoading(bol) {
    this._isLoading = bol;
  }

  get isLoading() {
    return this._isLoading;
  }

  setError(str) {
    this._error = str;
  }

  get userError() {
    return this._error;
  }

  async login(email, password) {
    try {
      const user = await login(email, password);
      this.setToUser(user);
    } catch (e) {
      console.log("login err: ", e);
      throw e;
    }
  }

  async registration(email, password) {
    try {
      const user = await registration(email, password);
      this.setToUser(user);
    } catch (e) {
      this.setError(e.response.data.message);
      throw e;
    }
  }

  async checkAuth() {
    this.setIsLoading(true);
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/refresh`,
        {
          withCredentials: true
        }
      );
      this.setToUser(user.data.user);
      localStorage.setItem("token", user.data.accessToken);
    } catch (e) {
      localStorage.removeItem("token");
    } finally {
      this.setIsLoading(false);
    }
  }

  setToUser(user) {
    this.setIsAuth(true);
    this.setUser({ ...user });
  }
}
