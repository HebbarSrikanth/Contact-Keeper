import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
//import { v4 as uuid } from 'uuid'
import type from '../types'
import Axios from 'axios'

const ContactState = (props) => {

    const initialState = {
        contacts: null,
        currentUser: null,
        filtered: null,
        error: null,
        loading: true
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    //Add Contact
    const addContact = async (contactDetails) => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await Axios.post('/api/contacts', contactDetails, config)
            dispatch({
                type: type.ADD_USER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: type.CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Fetch all the user for the associated logined user
    const fetchContacts = async () => {
        try {
            const res = await Axios.get('/api/contacts')
            dispatch({
                type: type.FETCH_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: type.CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Edit Contact
    const editContact = async (contactDetails) => {

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await Axios.put('/api/contacts/' + contactDetails._id, contactDetails, config)
            dispatch({
                type: type.UPDATE_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: type.CONTACT_ERROR,
                payload: err.response.msg
            })
        }

        dispatch({
            type: type.UPDATE_CONTACT,
            payload: contactDetails
        })
    }


    //Delete Contact
    const deleteContact = async id => {

        try {
            await Axios.delete('/api/contacts/' + id)

            dispatch({
                type: type.DELETE_USER,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: type.CONTACT_ERROR,
                payload: err.response.msg
            })
        }
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

    //Clear Contact
    const clearContacts = () => {
        dispatch({
            type: type.CLEAR_CONTACT
        })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                curUser: state.currentUser,
                filter: state.filtered,
                error: state.error,
                loading: state.loading,
                addContact,
                deleteContact,
                setCurrentUser,
                delCurrentUser,
                editContact,
                filterContact,
                clearFilter,
                fetchContacts,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>)

}

export default ContactState
