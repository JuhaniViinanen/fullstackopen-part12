import { createSlice } from "@reduxjs/toolkit";
import {
  displaySuccessMessage,
  displayErrorMessage,
} from "./notificationReducer";
import blogService from "../services/blogs";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const initalizeUser = () => {
  return (dispatch) => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(displaySuccessMessage("login succesful.", 10));
    } catch (exception) {
      dispatch(displayErrorMessage(`${exception.response.data.error}`, 10));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken("");
    dispatch(clearUser());
    dispatch(displaySuccessMessage("logout successful.", 10));
  };
};

export default userSlice.reducer;
