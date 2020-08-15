import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import type from '../types'
import setAuthtoken from '../../utils/setAuthtoken'

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        error: null,
        isAuthenticated: null,
        loading: true,
        user: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    //Load User
    const loadUser = async () => {

        if (localStorage.token)
            setAuthtoken(localStorage.token)
        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: type.USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: type.AUTH_ERROR,
                payload: err.response.data.msg
            })
        }
    }

    //Register User
    const register = async (formData) => {

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/user', formData, config);

            dispatch({
                type: type.REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (err) {
            dispatch({ type: type.REGISTER_FAIL, payload: err.response.data.msg })
        }
    }

    //Login User

    const login = async (loginDetails) => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', loginDetails, config)

            dispatch({
                type: type.LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: type.LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    //Logout
    const logout = () => {
        dispatch({
            type: type.LOGOUT
        })
    }

    //Clear Error
    const clearErrors = () => dispatch({ type: type.CLEAR_ERRORS })


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                error: state.error,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                register,
                clearErrors,
                loadUser,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState

