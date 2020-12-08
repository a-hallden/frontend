import axios from "axios";

const AUTH_TOKEN_KEY = "@AUTH_TOKEN";
const USER_ID_KEY = "@USER_ID";
const USER_EMAIL_KEY = "@USER_EMAIL";
const USER_FIRST_NAME_KEY = "@USER_FIRST_NAME";
const USER_LAST_NAME_KEY = "@USER_LAST_NAME";

export default class {
  constructor() {
    const baseURL = this._getBaseURL();
    this.authURL = `${baseURL}/api-token-auth/`;
    this.refreshURL = `${baseURL}/api-token-refresh/`;
    this.verifyURL = `${baseURL}/api-token-verify/`;
    this.logoutURL = `${baseURL}/api-token-logout/`;
  }

  async auth(payload) {
    return await axios.post(this.authURL, payload);
  }

  async getMe() {
    const meURL = "/me/";
    const response = await this.doGet(meURL);
    if (response) {
      const data = response.data;

      localStorage.setItem(USER_ID_KEY, data.id);
      localStorage.setItem(USER_EMAIL_KEY, data.email);
      localStorage.setItem(USER_FIRST_NAME_KEY, data.first_name);
      localStorage.setItem(USER_LAST_NAME_KEY, data.last_name);

      return data;
    }
  }

  getUserInfo() {
    if (process.browser) {
      return {
        id: localStorage.getItem(USER_ID_KEY),
        email: localStorage.getItem(USER_EMAIL_KEY),
        firstName: localStorage.getItem(USER_FIRST_NAME_KEY),
        lastName: localStorage.getItem(USER_LAST_NAME_KEY),
      };
    }
    return {};
  }

  verify(token) {
    return axios
      .post(this.verifyURL, { token })
      .then((response) => {
        this.refresh(token);
        return response;
      })
      .catch(() => {
        this.setToken("");
        return false;
      });
  }

  refresh(token) {
    return axios.post(this.refreshURL, { token });
  }

  setToken(token) {
    return localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  logout() {
    localStorage.setItem(AUTH_TOKEN_KEY, "");
    localStorage.setItem(USER_ID_KEY, "");
    localStorage.setItem(USER_EMAIL_KEY, "");
    localStorage.setItem(USER_FIRST_NAME_KEY, "");
    localStorage.setItem(USER_LAST_NAME_KEY, "");
    // routing.index({ push: true });
  }

  async localStorageTokenIsValid() {
    const token = this.getToken();
    return await this.verify(token);
  }

  async doGet(url, params, headers) {
    const axios = await this.initializeAxiosInstance();
    if (axios.defaults.headers.common["Authorization"]) {
      const response = headers
        ? await axios.get(url, { params }, { crossdomain: true }, headers)
        : await axios.get(url, { params }, { crossdomain: true });
      return response;
    }
  }

  async doPost(url, payload, headers) {
    const axios = await this.initializeAxiosInstance();
    if (axios.defaults.headers.common["Authorization"]) {
      const response = headers
        ? await axios.post(url, payload, { headers }, { crossdomain: true })
        : await axios.post(url, payload);
      return response;
    }
  }

  async doUnauthenticatedPost(url, payload, headers) {
    return axios.post(
      `${this._getBaseURL()}/${this._getApiURL()}${url}`,
      payload,
      { headers },
      { crossdomain: true }
    );
  }

  async doUnauthenticatedGet(url, params, headers) {
    return axios.get(
      `${this._getBaseURL()}/${this._getApiURL()}${url}`,
      { params },
      { headers }
    );
  }

  async doPut(url, payload) {
    const axios = await this.initializeAxiosInstance();
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.put(url, payload);
      return response;
    }
  }

  async doDelete(url) {
    const axios = await this.initializeAxiosInstance();
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.delete(url);
      return response;
    }
  }

  async initializeAxiosInstance() {
    if (
      this._instance &&
      this._instance.defaults.headers.common["Authorization"]
    ) {
      return this._instance;
    }

    this._instance = axios.create({
      baseURL: `${this._getBaseURL()}/${this._getApiURL()}`,
    });

    // if (process.browser) {
    //   const validTokenResponse = await this.localStorageTokenIsValid();
    //   if (validTokenResponse && validTokenResponse.data.token) {
    //     this._instance.defaults.headers.common[
    //       "Authorization"
    //     ] = `Bearer ${validTokenResponse.data.token}`;
    //   }
    // }

    return this._instance;
  }

  _getBaseURL() {
    return "url goes here"; // dev
  }

  _getApiURL() {
    return "api/v1/";
  }
}
