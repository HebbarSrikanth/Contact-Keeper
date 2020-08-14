import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import types from '../types'

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        error: null,
        isAuthenticated: '',
        loading: true,
        user: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    //Login User

    //Register User

    //Load User

    //Logout

    //Clear Error


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                error: state.error,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState

