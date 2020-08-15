import type from '../types'

export default (state, action) => {
    switch (action.type) {

        case type.USER_LOADED: return {
            ...state,
            user: action.payload,
            isAuthenticated: true,
            loading: false
        }

        case type.REGISTER_SUCCESS:
        case type.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            }
        case type.REGISTER_FAIL:
        case type.AUTH_ERROR:
        case type.LOGIN_FAIL:
        case type.LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                error: action.payload,
                user: null,
                loading: false
            }
        case type.CLEAR_ERRORS: return {
            ...state,
            error: null
        }
        default:
            return state;
    }
}