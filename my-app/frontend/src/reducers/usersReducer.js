import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    addBlogToUser(state, action) {
      const username = action.payload.username;
      const blog = action.payload.blog;
      return state.map((user) =>
        user.username !== username
          ? user
          : {
              ...user,
              blogs: user.blogs.concat({
                author: blog.author,
                id: blog.id,
                title: blog.title,
                url: blog.url,
              }),
            }
      );
    },
    removeBlogFromUser(state, action) {
      return state.map((user) =>
        user.username !== action.payload.username
          ? user
          : {
              ...user,
              blogs: user.blogs.filter((blog) => blog.id !== action.payload.id),
            }
      );
    },
  },
});

export const { setUsers, addBlogToUser, removeBlogFromUser } =
  usersSlice.actions;

export const initalizeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const addBlog = (user, blog) => {
  return (dispatch) => {
    dispatch(
      addBlogToUser({
        username: user.username,
        blog,
      })
    );
  };
};

export const removeUsersBlog = (blog) => {
  return (dispatch) => {
    dispatch(
      removeBlogFromUser({
        username: blog.user.username,
        id: blog.id,
      })
    );
  };
};

export default usersSlice.reducer;
