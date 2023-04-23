import axios from "axios";

export const signup = (user) => {
  const {
    registerType,
    name,
    email,
    userId,
    accessToken,
    profilePic,
    password,
  } = user;
  return axios
    .post("http://localhost:3100/api/v1/register", {
      registerType,
      name,
      email,
      userId,
      accessToken,
      profilePic,
      password,
    })
    .then((res) => {
      saveToken(res.data.token);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const signin = (email, password) => {
  return axios
    .post("http://localhost:3100/api/v1/login", { email, password })
    .then(async (res) => {
      saveToken(res.data.token);
      return {
        valid: true,
        status: res.status,
        message: res.data.message,
      };
    })
    .catch((err) => {
      return {
        valid: false,
        status: 400,
        message: "Invalid username or password",
      };
    });
};

export const socialSignin = (type, userId, accessToken) => {
  return axios
    .post("http://localhost:3100/api/v1/sociallogin", {
      type,
      userId,
      accessToken,
    })
    .then(async (res) => {
      saveToken(res.data.token);
      return {
        valid: true,
        status: res.status,
        message: res.data.message,
      };
    })
    .catch((err) => {
      return {
        valid: false,
        status: 400,
        message: "Invalid username or password",
      };
    });
};

const saveToken = (token) => {
  const data = `Bearer ${token}`;
  window.localStorage.setItem("Snap", data);
};

export const getToken = () => {
  return window.localStorage.getItem("Snap");
};

export const signout = () => {
  window.localStorage.removeItem("Snap");
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("Snap")) {
    return true;
  } else {
    return false;
  }
};
