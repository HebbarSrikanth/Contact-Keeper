import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {

    const authContext = useContext(AuthContext)
    const { login, isAuthenticated, error, clearErrors } = authContext

    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext

    const [state, setState] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        if (isAuthenticated)
            props.history.push('/')

        if (error) {
            setAlert(error, 'danger')
            clearErrors();
        }
        //eslint-disable-next-line
    }, [isAuthenticated, error, props.history])

    const { email, password } = state

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        if (email.trim().length > 0 && password.trim().length > 0) {
            login({
                email,
                password
            })
        }
        else {
            setAlert('Email/Password is missing', 'danger')
        }
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
