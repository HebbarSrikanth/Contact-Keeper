import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import { v4 as uuid } from 'uuid'
import type from '../types'

const ContactState = (props) => {

    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Sheldon Cooper',
                email: 'sc@gmail.com',
                type: 'professional',
                phone: '0123456789'
            },
            {
                id: 2,
                name: 'Leonard',
                email: 'lc@gmail.com',
                type: 'personal',
                phone: '1023456789'
            }
        ],
        currentUser: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    //Add Contact
    const addContact = (contactDetails) => {
        contactDetails.id = uuid();
        dispatch({
            type: type.ADD_USER,
            payload: contactDetails
        })
    }

    //Edit Contact
    const editContact = (contactDetails) => {
        dispatch({
            type: type.UPDATE_CONTACT,
            payload: contactDetails
        })
    }


    //Delete Contact
    const deleteContact = id => {
        dispatch({
            type: type.DELETE_USER,
            payload: id
        })
    }

    //Set current contact

    const setCurrentUser = contactDetails => {
        dispatch({
            type: type.SET_CURRENT,
            payload: contactDetails
        })
    }


    //Clear current contact
    const delCurrentUser = () => {
        dispatch({ type: type.CLEAR_CURRENT })
    }

    //Filter Contact
    const filterContact = (text) => {
        dispatch({ type: type.FILTER_CONTACT, payload: text })
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: type.CLEAR_FILTER })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                curUser: state.currentUser,
                filter: state.filtered,
                addContact,
                deleteContact,
                setCurrentUser,
                delCurrentUser,
                editContact,
                filterContact,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>)

}

export default ContactState
