import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appUser = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    dispatch(likeBlog(blog, blog.likes + 1));
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title}?`)) {
      dispatch(deleteBlog(blog));
      navigate("/blogs");
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog, comment));
    setComment("");
  };

  if (!blog) return null;

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <ul>
        <li>
          <a href={blog.url}>{blog.url}</a>
        </li>
        <li>
          {`${blog.likes} likes`}{" "}
          <button type="button" onClick={handleLike}>
            like
          </button>
        </li>
        <li>{`added by ${blog.user.name}`}</li>
      </ul>
      {appUser.username === blog.user.username && (
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      )}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          required
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li className="comment" key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
