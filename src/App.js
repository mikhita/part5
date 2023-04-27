import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessageRed, setErrorMessageRed] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const updateBlog = (blog) => {
    console.log('Sending request to:', window.location.href + '/api/blogs/' + blog.id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('Updated blog:', updatedBlog)
    blogService
      .update(blog.id, updatedBlog, { populate: true })
      .then((returnedBlog) => {
        console.log('Returned blog:', returnedBlog)
        console.log('Returned blog:', returnedBlog.likes)
        setBlogs((prevBlogs) =>
          prevBlogs.map((prevBlog) =>
            prevBlog.id !== returnedBlog.id ? prevBlog : returnedBlog
          )
        )
      })
      .catch((error) => {
        console.log('Error updating blog:', error)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Togglable buttonLabel="log in">
          <LoginForm
            errorMessageRed={errorMessageRed}
            setErrorMessageRed={setErrorMessageRed}
            setUser={setUser}
          />
        </Togglable>
      </div>
    )
  }


  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        blogFormRef.current.toggleVisibility()
        setBlogs(blogs.concat(returnedBlog))
      })
  }
  const sortedByLikes = [...blogs].sort((b, a) => a.likes - b.likes)
  console.log(sortedByLikes)

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {sortedByLikes.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={blog.user} updateBlog={updateBlog}/>
        )}
      </ul>
      {user && <div>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      }

    </div>
  )
}

export default App