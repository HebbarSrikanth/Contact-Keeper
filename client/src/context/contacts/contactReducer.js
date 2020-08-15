
import type from '../types'

const contactReducer = (state, action) => {
    switch (action.type) {
        case type.ADD_USER: return {
            ...state,
            contacts: [...state.contacts, action.payload],
            loading: false
        }
        case type.DELETE_USER: return {
            ...state,
            loading: false,
            contacts: state.contacts.filter(contact => contact._id !== action.payload)
        }
        case type.SET_CURRENT: return {
            ...state,
            currentUser: action.payload
        }
        case type.CLEAR_CURRENT: return {
            ...state,
            currentUser: null
        }
        case type.UPDATE_CONTACT: return {
            ...state,
            loading: false,
            contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact)
        }
        case type.FILTER_CONTACT: return {
            ...state,
            filtered: state.contacts.filter(contact => {
                const regex = new RegExp(action.payload, 'gi')
                return contact.name.match(regex) || contact.email.match(regex)
            })
        }
        case type.CLEAR_FILTER: return {
            ...state,
            filtered: null
        }
        case type.CONTACT_ERROR: return {
            ...state,
            error: action.payload
        }
        case type.FETCH_CONTACT: return {
            ...state,
            loading: false,
            contacts: action.payload
        }
        case type.CLEAR_CONTACT: return {
            ...state,
            contacts: null,
            loading: true,
            error: false,
            filtered: null,
            currentUser: null
        }
        default: return state
    }
}

export default contactReducer