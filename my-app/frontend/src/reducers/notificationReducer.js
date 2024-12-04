import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: ["", ""],
  reducers: {
    setSuccessMessage(state, action) {
      return [action.payload, state[1]];
    },
    clearSuccessMessage(state, action) {
      return ["", state[1]];
    },
    setErrorMessage(state, action) {
      return [state[0], action.payload];
    },
    clearErrorMessage(state, action) {
      return [state[0], ""];
    },
  },
});

export const {
  setSuccessMessage,
  clearSuccessMessage,
  setErrorMessage,
  clearErrorMessage,
} = notificationSlice.actions;

export const displaySuccessMessage = (message, time) => {
  return async (dispatch) => {
    dispatch(setSuccessMessage(message));
    setTimeout(() => dispatch(clearSuccessMessage()), time * 1000);
  };
};

export const displayErrorMessage = (message, time) => {
  return async (dispatch) => {
    dispatch(setErrorMessage(message));
    setTimeout(() => dispatch(clearErrorMessage()), time * 1000);
  };
};

export default notificationSlice.reducer;
