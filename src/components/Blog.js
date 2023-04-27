import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, updateBlog }) => {
  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const makeVisibilityTrue = () => {
    setVisible(false)
  }

  // const updateBlog = () => {
  //   console.log('Sending request to:', window.location.href + '/api/blogs/' + blog.id)
  //   const updatedBlog = { ...blog, likes: blog.likes + 1 }
  //   console.log('Updated blog:', updatedBlog)
  //   blogService
  //     .update(blog.id, updatedBlog, { populate: true })
  //     .then((returnedBlog) => {
  //       console.log('Returned blog:', returnedBlog)
  //       console.log('Returned blog:', returnedBlog.likes)
  //       if (blogs) {
  //         setBlogs(
  //           blogs.map((blog) =>
  //             blog.id !== returnedBlog.id ? blog : returnedBlog
  //           )
  //         )
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('Error updating blog:', error)
  //     })
  // }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (error) {
        console.log('Error removing blog:', error)
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const buttonStyleRemove = {
    background: 'blue',
    color: 'white',
  }

  return (
    <li className='blog'>
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={makeVisibilityTrue}>view</button>
        </div>
        <div style={hideWhenVisible}>
          <div style={blogStyle}>
            {blog.url} <button onClick={toggleVisibility}>hide</button>
          </div>
          <div style={blogStyle}>
            {blog.likes} <button onClick={() => updateBlog(blog)}>like</button>
          </div>
          {blog.user && (
            <div>
              <div style={blogStyle}>
                {blog.user.username} {blog.user.name}
              </div>
              {user && user.username === blog.user.username && (
                <button style={buttonStyleRemove} onClick={handleRemove}>
                  remove
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default Blog
