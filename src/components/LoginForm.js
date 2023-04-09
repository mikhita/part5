import { useState } from 'react'
import NotificationRed from './NotificationRed'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const LoginForm = ({
  errorMessageRed, setErrorMessageRed, setUser
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  LoginForm.propTypes = {
    errorMessageRed: PropTypes.func.isRequired,
    setErrorMessageRed: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
  }
  return (
    <div>
      <NotificationRed message={errorMessageRed} />
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm