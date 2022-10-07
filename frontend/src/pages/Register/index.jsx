import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getResError, axiosInstance } from '../../utils'
export const Register = () => {
  const [inputs, setInputs] = useState(
    Object.freeze({
      email: '',
      name: '',
      password: '',
    })
  )
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      // Trimming whiespace
      [e.target.name]: e.target.value.trim(),
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/users/register/', inputs)
      navigate('/login')
    } catch (err) {
      // for (let i = 0; i < Object.entries(err.response.data).length; i++) {
      //   for (let j = 1; j < Object.entries(err.response.data)[i].length; j++) {
      //     console.log(...Object.entries(err.response.data)[i][j])
      //   }
      // }
      setErr(err.response.data)
      // console.log(getError(err.response.data))
    }
  }
  // console.log(inputs)
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input
          required
          type='email'
          placeholder='email'
          name='email'
          onChange={handleChange}
        />
        <input
          required
          type='name'
          placeholder='name (changable)'
          name='name'
          onChange={handleChange}
        />
        <input
          required
          type='password'
          placeholder='password'
          name='password'
          onChange={handleChange}
          onKeyDown={(e) => {
            e.key === 'Enter' ? document.getElementById('login').click() : {}
          }}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && getResError(err).map((v, k) => <p key={k}>{v}</p>)}
        <span>
          Do you have an account{' '}
          <Link to='/login' id='login'>
            Login
          </Link>
        </span>
      </form>
    </div>
  )
}
