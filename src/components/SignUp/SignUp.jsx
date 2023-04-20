import React, { useContext, useState } from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
const SignUp = () => {
  const { createUser } = useContext(AuthContext)
  const [error, setError] = useState('')
  const handleSignUp = event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value
    const confirm = form.confirm.value

    setError('')
    if (password !== confirm) {
      setError('Your password did not match')
      return
    } else if (password.length < 6) {
      setError('Your password must be 6 character long')
      return
    }
    createUser(email, password)
      .then(result => {
        const loggedUser = result.user
        console.log(loggedUser)
      })
      .catch(error => {
        console.error(error)
        setError(error.message)
      })
  }
  return (
    <div className='form-container'>
      <h1 className='form-title'>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' required placeholder='email' />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            required
            placeholder='password'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            name='confirm'
            required
            placeholder='confirm password'
          />
        </div>
        <input type='submit' className='btn-submit' value='Register' />
      </form>
      <p>
        <small>
          Already have an account? <Link to='/login'>Login</Link>
        </small>
      </p>
      <p className='text-error'>{error}</p>
    </div>
  )
}

export default SignUp
