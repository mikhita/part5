import React, {useState} from 'react'
  const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const makeVisibilityTrue = () => {
    setVisible(false)
  }
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
        {blog.likes} <button>like</button>
      </div>
      <div style={blogStyle}>
        {blog.user.username} {blog.user.name} 
      </div>
      </div>
    </div>
  )}
export default Blog