import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initalizeBlogs } from "./reducers/blogReducer";
import { initalizeUser } from "./reducers/userReducer";
import { initalizeUsers } from "./reducers/usersReducer";

import NavigationBar from "./components/NavigationBar";
import Blog from "./components/Blog";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import BlogsView from "./components/BlogsView";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import UsersView from "./components/UsersView";
import UserView from "./components/UserView";

import { Routes, Route, useMatch } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const appUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [successMessage, errorMessage] = useSelector(
    (state) => state.notifications
  );
  const userMatch = useMatch("/users/:id");
  const blogMatch = useMatch("/blogs/:id");

  useEffect(() => {
    dispatch(initalizeBlogs());
    dispatch(initalizeUser());
    dispatch(initalizeUsers());
  }, []);

  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return (
    <div className="app">
      {appUser === null ? <h2>Log in to application</h2> : <NavigationBar />}
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      {appUser === null ? (
        <LoginForm />
      ) : (
        <Routes>
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route
            path="/blogs"
            element={
              <>
                <BlogForm />
                <BlogsView />
              </>
            }
          />
          <Route path="/users/:id" element={<UserView user={user} />} />
          <Route path="/users" element={<UsersView />} />
          <Route
            path="/"
            element={
              <>
                <BlogForm />
                <BlogsView />
              </>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
