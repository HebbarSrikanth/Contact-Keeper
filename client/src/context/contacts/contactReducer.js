
import type from '../types'

const contactReducer = (state, action) => {
    switch (action.type) {
        case type.ADD_USER: return {
            ...state,
            contacts: [...state.contacts, action.payload]
        }
        case type.DELETE_USER: return {
            ...state,
            contacts: state.contacts.filter(contact => contact.id !== action.payload)
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
            contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
        }
        default: return state
    }
}

export default contactReducer