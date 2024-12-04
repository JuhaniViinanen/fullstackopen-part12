import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const appUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }, appUser));
    setTitle("");
    setAuthor("");
    setUrl("");
    setVisible(!visible);
  };

  return (
    <div>
      <div style={{ display: visible ? "unset" : "none" }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="blog-title-input">title</label>
            <input
              type="text"
              value={title}
              name="Title"
              id="blog-title-input"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <label htmlFor="blog-author-input">author</label>
            <input
              type="text"
              value={author}
              name="Author"
              id="blog-author-input"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <label htmlFor="blog-url-input">url</label>
            <input
              type="url"
              value={url}
              name="URL"
              id="blog-url-input"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div className="formButtons">
            <button type="submit">create</button>
            <button type="button" onClick={() => setVisible(!visible)}>
              cancel
            </button>
          </div>
        </form>
      </div>
      <div style={{ display: visible ? "none" : "unset" }}>
        <button
          className="toggleButton"
          type="button"
          onClick={() => setVisible(!visible)}
        >
          create new
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
