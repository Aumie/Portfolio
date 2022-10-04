import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context'
import { getResError } from '../../utils'

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate(-1)
    } catch (err) {
      setErr(err.response.data)
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input
          type='email'
          placeholder='email'
          name='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && getResError(err).map((v, k) => <p key={k}>{v}</p>)}
        <span>
          Don't you have an account <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
  )
}
