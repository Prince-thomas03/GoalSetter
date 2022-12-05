import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '', password: '',
  })

  const { email, password, } = formData

  const onChange = (e) => {

    setFormData((prevstate) => ({
      ...prevstate[e.target.name] = e.target.value,
    })

    )

  }

  const onSubmit = (e) => {
    e.preventDefault()
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
            <input type="email" placeholder='enter the email' value={email} onChange={onChange} id='email' className="form-control" />
          </div>

          <div className="form-group">
            <input type="password" placeholder='enter the password' value={password} onChange={onChange} id='password' className="form-control" />
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