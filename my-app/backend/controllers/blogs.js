const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const {userExtractor} = require("../utils/middleware")
const { update } = require("lodash")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post("/", userExtractor, async (req, res, next) => {
  try {
    const user = req.user
    const blog = new Blog({
      ...req.body,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post("/:id/comments/", async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {$push: { comments: req.body.comment }},
      { runValidators: true, new: true }
    )
    res.status(200).json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, context: "query", new: true }
    )
    res.status(200).json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(204).end()
    const user = req.user

    if (blog.user.toString() === user._id.toString()) {
      user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString())
      await user.save()
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } else {
      res.status(401).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter
