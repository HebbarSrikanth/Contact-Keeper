import React, { useReducer } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import type from '../types'
import { v4 as uuid } from 'uuid'

const AlertState = (props) => {

    const initialState = []

    const [state, dispatch] = useReducer(AlertReducer, initialState)

    //Set Alert
    const setAlert = (message, text, timeOut = 5000) => {
        const id = uuid();
        dispatch({
            type: type.SET_ALERT,
            payload: { message, text, id }
        })

        setTimeout(() => dispatch({ type: type.CLEAR_ALERT, payload: { id } }), timeOut)
    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
