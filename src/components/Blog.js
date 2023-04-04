import React, {useState} from 'react'
import blogService from '../services/blogs'
  const Blog = ({ blog , blogs, setBlogs, likes, user}) => {
    const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const makeVisibilityTrue = () => {
    setVisible(false)
  }
  
  const updateBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    console.log(updatedBlog);
    blogService
      .update(blog.id, updatedBlog, { populate: true })
      .then((returnedBlog) => {
        console.log('Returned blog:', returnedBlog);
        if (blogs) {
          setBlogs(
            blogs.map((blog) =>
              blog.id !== returnedBlog.id ? blog : returnedBlog
            )
          );
        }
      })
      .catch((error) => {
        console.log('Error updating blog:', error);
      });
  };
  
  
  
  
  
  
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
  
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={makeVisibilityTrue}>view</button>
        </div>
        <div style={hideWhenVisible}>
        <div style={blogStyle}>
        {blog.url} <button onClick={toggleVisibility}>hide</button>
      </div>
      <div style={blogStyle}>
        {blog.likes} <button onClick={updateBlog}>like</button>
      </div>
      {blog.user && (
        <div style={blogStyle}>
          {blog.user.username} {blog.user.name} 
        </div>
      )}
      </div>
    </div>
  )}
export default Blog