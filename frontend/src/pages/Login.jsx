import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '', password: '',
  })

  const { email, password, } = formData


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {

    setFormData((prevstate) => ({
      ...prevstate, [e.target.name]: e.target.value,
    })

    )

  }

  const onSubmit = (e) => {
    e.preventDefault()


    const userData = {

      email,
      password,
    }

    dispatch(login(userData))
  }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>

      <section className='heading'>
        <h1><FaSignInAlt />Login</h1>
        <p>please create the account</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>

          <div className="form-group">
            <input type="email" placeholder='enter the email' value={email} onChange={onChange} id='email' name='email' className="form-control" />
          </div>

          <div className="form-group">
            <input type="password" placeholder='enter the password' value={password} onChange={onChange} id='password' name='password' className="form-control" />
          </div>

          <div className="form-group">
            <button type='submit' className=" btn btn-block">button</button>
          </div>
        </form>
      </section>



    </>
  )
}

export default Login
