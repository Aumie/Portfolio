import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context'
import { getResError } from '../../utils'

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })
  const [err, setErr] = useState(false)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputs.email) {
      setMsg('Your email must not be blank')
      setErr(true)
    }
    if (!inputs.password) {
      setMsg('Your password must not be blank')
      setErr(true)
    }

    try {
      await login(inputs)
      // ../ = replace
      if (location.state) {
        navigate(`../${location.state.from}`, {
          replace: true,
          state: { from: '/login' },
        })
        navigate(0)
      } else {
        navigate('/home')
        navigate(0)
      }
    } catch (err) {
      setErr(true)
      setMsg(
        getResError(err)?.map((v, k) => {
          v
        })
      )
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setMsg('')
      setErr(false)
    }, 5000)
  }, [msg])
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
          onKeyDown={(e) => {
            e.key === 'Enter' ? document.getElementById('login').click() : {}
          }}
        />
        <button onClick={handleSubmit} id='login'>
          Login
        </button>
        <span style={{ color: 'red' }}>{err && msg}</span>
        <span>
          Don't you have an account <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
  )
}
