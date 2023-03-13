import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NotificationRed from './components/NotificationRed'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newUrl, setNewUrl] = useState('')
  const [password, setPassword] = useState('') 
  // const [errorMessage, setErrorMessage] = useState(null)
  const [errorMessageRed, setErrorMessageRed] = useState(null)
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error.response.status === 500) {
        console.log(error.response.status)
        setErrorMessageRed('wrong username or password')
      } 
      setTimeout(() => {
        setErrorMessageRed(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // const loginForm = () => {
  //   const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  //   const showWhenVisible = { display: loginVisible ? '' : 'none' }

  //   return (
  //     <div>
  //       <div style={hideWhenVisible}>
  //         <button onClick={() => setLoginVisible(true)}>log in</button>
  //       </div>
  //       <div style={showWhenVisible}>
  //         <button onClick={() => setLoginVisible(false)}>cancel</button>
  //       </div>
  //     </div>
  //   )
  // }
  // const addBlog = (event) => {
  //   event.preventDefault()
  //   const blogObject = {
  //     title: newTitle,
  //     author: newAuthor,
  //     url: newUrl
  //   }

  //   blogService
  //     .create(blogObject)
  //       .then(returnedBlog => {
  //       setBlogs(blogs.concat(returnedBlog))
  //       setNewTitle('')
  //       setNewAuthor('')
  //       setNewUrl('')
  //       setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} was added`);
  //           setTimeout(() => {
  //             setErrorMessage(null);
  //           }, 5000);
  //     })
  // }

  // const handleTitleChange = (value) => {
  //   setNewTitle(value)
  // }
  // const handleAuthorChange = (value) => {
  //   setNewAuthor(value)
  // }
  // const handleUrlChange = (value) => {
  //   setNewUrl(value)
  // }

  // const blogForm = () => (
  //   <form style={{display: "flex", flexDirection: "column", width: "20%", gap:"20px"}} onSubmit={addBlog}>
  //     <div style={{display: "flex", justifyContent: "space-between"}}>
  //     <label name='title'>title:</label>
  //     <input
  //       id='title'
  //       value={newTitle}
  //       onChange={handleTitleChange}
  //     />
  //     </div>
  //     <div style={{display: "flex", justifyContent: "space-between"}}>
  //     <label name='author'>author:</label>
  //     <input
  //       id='author'
  //       value={newAuthor}
  //       onChange={handleAuthorChange}
  //     />
  //     </div>
  //     <div style={{display: "flex", justifyContent: "space-between"}}>
  //     <label name='url'>url:</label>
  //     <input
  //     id='url'
  //     value={newUrl}
  //     onChange={handleUrlChange}
  //     />
  //     </div>
  //     <button style={{width:"40%", marginTop: "20px"}} type="submit">create</button>
  //   </form>  
  // )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <NotificationRed message={errorMessageRed} />
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {user && <div>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new blog">
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
          />
      </Togglable>
        </div>
      }

    </div>
  )
}

export default App