import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = (props) => {
    //Import AuthContext
    const authContext = useContext(AuthContext)
    const { register, error, clearErrors, isAuthenticated } = authContext

    //Import Alert Context
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext

    //Declare Component Required State
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    //Destructre for simplified usage of state
    const { name, email, password, passwordConfirm } = state

    //Handling on Change event when ever user enters in respective input forms
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    //Handling when clicked on submit
    const submitForm = e => {
        e.preventDefault()
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter the mandatory fields', 'danger')
        } else if (password !== passwordConfirm) {
            setAlert(`Passwords doesn't match`, 'danger')
        } else {
            register({
                name,
                email,
                password
            })
        }
    }

    //Whenever components gets loaded or when there is a change in error state run , 
    useEffect(() => {

        if (isAuthenticated) {
            props.history.push('/')
        }

        if (error) {
            setAlert('User already Exists', 'danger')
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    return (
        <div className='card form-container'>
            <h3>Account Register</h3>
            <form onSubmit={submitForm}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' value={name} name='name' placeholder='User Name' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' value={email} name='email' placeholder='Email' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' value={password} name='password' placeholder='Password' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='passwordConfirm'>Confirm Password</label>
                    <input type='password' value={passwordConfirm} name='passwordConfirm' placeholder='Confirm Password' onChange={handleChange} />
                </div>
                <input className='btn btn-success btn-block' type='submit' value="Register" />
            </form>
        </div>
    )
}

export default Register
