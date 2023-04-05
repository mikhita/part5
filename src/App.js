import { useState, useEffect} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessageRed, setErrorMessageRed] = useState(null)
  const [user, setUser] = useState(null)


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
  const sortedByLikes = [...blogs].sort((b, a) => a.likes - b.likes)
        console.log(sortedByLikes);

  return (
    <div>
      <h2>blogs</h2>
      {sortedByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} likes={blog.likes} user={blog.user}/>
      )}
      {user && <div>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
          />
        </div>
      }

    </div>
  )
}

export default App