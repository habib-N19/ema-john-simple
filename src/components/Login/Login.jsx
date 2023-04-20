import React, { useContext, useState } from 'react'
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
const Login = () => {
  // show pass
  const [show, setShow] = useState(false)
  const { signIn } = useContext(AuthContext)
  // dynamic redirect
  const navigate = useNavigate()
  const location = useLocation()
  // fixing dynamic redirection
  const from = location.state?.from?.pathname || '/'
  // handle submit
  const handleLogin = event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value
    signIn(email, password)
      .then(result => {
        const loggedUser = result.user
        form.reset()
        console.log(loggedUser)
        navigate(from, { replace: true })
      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <div className='form-container'>
      <h1 className='form-title'>From login</h1>
      <form onSubmit={handleLogin}>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' required placeholder='email' />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type={show ? 'text' : 'password'}
            name='password'
            required
            placeholder='password'
          />
          <p onClick={() => setShow(!show)}>
            {show ? <span>Hide Password</span> : <span>Show password</span>}
          </p>
        </div>
        <input type='submit' className='btn-submit' value='Login' />
      </form>
      <p>
        <small>
          New to ema john? <Link to='/signup'>Create new account</Link>
        </small>
      </p>
    </div>
  )
}

export default Login
