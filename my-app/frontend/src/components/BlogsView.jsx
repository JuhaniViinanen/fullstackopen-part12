import { createSelector } from "@reduxjs/toolkit";
const selectBlogs = createSelector([(state) => state.blogs], (blogs) =>
  [...blogs].sort((a, b) => b.likes - a.likes)
);
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogsView = () => {
  const blogs = useSelector(selectBlogs);

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsView;
