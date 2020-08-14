import React, { useState } from 'react'

const Login = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
    })

    const { email, password } = state

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        console.log(state)
    }

    return (
        <div className='card form-container'>
            <h3>Login</h3>
            <form onSubmit={submitForm}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' value={email} name='email' placeholder='Email' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' value={password} name='password' placeholder='Password' onChange={handleChange} />
                </div>
                <input className='btn btn-success btn-block' type='submit' value="Login" />
            </form>
        </div>
    )
}

export default Login
