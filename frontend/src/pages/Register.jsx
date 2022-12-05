import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', password2: ''
  })

  const { name, email, password, password2 } = formData

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
        <h1>Register<FaUser /></h1>
        <p>please create the account</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" placeholder='enter the name' value={name} onChange={onChange} id='name' className="form-control" />
          </div>
          <div className="form-group">
            <input type="email" placeholder='enter the email' value={email} onChange={onChange} id='email' className="form-control" />
          </div>
       
        <div className="form-group">
          <input type="password" placeholder='password' value={password} onChange={onChange} id='password' className="form-control" />
        </div>
        <div className="form-group">
          <input type="password2" placeholder='confirm password' value={password2} onChange={onChange} id='password2' className="form-control" />
        </div>
        <div className="form-group">
          <button type='submit' className=" btn btn-block">sign</button>
        </div>
        </form>
      </section>



    </>
  )
}

export default Register