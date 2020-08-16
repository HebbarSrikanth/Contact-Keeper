import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contacts/contactContext';
import AlertContext from '../../context/alert/alertContext';

const ContactForm = () => {

    //Importing Alert Context incase of errors while saving the contacts
    const alertcontext = useContext(AlertContext)
    const { setAlert } = alertcontext;

    //Importing Contact Context
    const contactContext = useContext(ContactContext)
    const { addContact, curUser, delCurrentUser, editContact } = contactContext;

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = state

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //Checking for the validation while saving/updating contacts

        if (name.length < 3)
            setAlert('Name should have more than 3 characters', 'danger')
        else if (phone.length < 10 || phone.length > 10)
            setAlert('Invalid Phone number', 'danger')
        else {
            if (curUser === null) {
                addContact(state);
            }
            else {
                editContact(state)
            }
        }
        clearAll()
    }

    const clearAll = () => {
        delCurrentUser()
    }

    useEffect(() => {
        if (curUser !== null) {
            setState(curUser)
        }
        else {
            setState({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, curUser])

    return (
        <form className='card' onSubmit={handleSubmit}>
            <h3 className='text-center'>{curUser ? 'Edit Details' : 'Add Details'}</h3>
            <input type='text' name='name' placeholder='Name' value={name} onChange={handleChange} />
            <input type='email' name='email' placeholder='Email' value={email} onChange={handleChange} />
            <input type='text' name='phone' placeholder='Phone' value={phone} onChange={handleChange} />
            <h5>Type</h5>
            <input type='radio' value='personal' checked={type === 'personal'} name='type' onChange={handleChange} />{' '}Personal {' '}
            <input type='radio' value='professional' checked={type === 'professional'} name='type' onChange={handleChange} />{' '}Professional{' '}
            <div>
                <input type='submit' className='btn btn-success btn-block' value={curUser ? 'Update Contact' : 'Add Contact'} />
            </div>
            {curUser && <div>
                <input type='submit' className='btn btn-light btn-block' value='Clear' onClick={clearAll} />
            </div>}
        </form>
    )
}

export default ContactForm
