import React, { useState, useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Register = () => {

    const alertContext = useContext(AlertContext)

    const { setAlert } = alertContext

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const { name, email, password, passwordConfirm } = state

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter the mandatory fields', 'danger')
        } else if (password !== passwordConfirm) {
            setAlert(`Passwords doesn't match`, 'danger')
        } else {
            console.log(state)
        }

    }

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
