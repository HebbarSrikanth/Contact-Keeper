import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import { INSERT_USER } from '../types'

const ContactState = (props) => {

    const initialState = {

    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    return (
        <ContactContext.Provider
            value={}
        >
            {props.children}
        </ContactContext.Provider>)

}

export default ContactState
