import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const BlogForm = ({blogs, setBlogs}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const handleTitleChange = (value) => {
    setNewTitle(value)
  }
  const handleAuthorChange = (value) => {
    setNewAuthor(value)
  }
  const handleUrlChange = (value) => {
    setNewUrl(value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} was added`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
      })
  }
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Create a new blog</h2>

      <form style={{display: "flex", flexDirection: "column", width: "20%", gap:"20px"}} onSubmit={addBlog}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <label name='title'>title:</label>
      <input
        id='title'
        value={newTitle}
        onChange={(event) => handleTitleChange(event.target.value)}
      />
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <label name='author'>author:</label>
      <input
        id='author'
        value={newAuthor}
        onChange={(event) => handleAuthorChange(event.target.value)}
      />
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <label name='url'>url:</label>
      <input
      id='url'
      value={newUrl}
      onChange={(event) => handleUrlChange(event.target.value)}
      />
      </div>
    <button style={{width:"40%", marginTop: "20px"}} type="submit">create</button>
        
    </form>
    </div>
  )
}

export default BlogForm