import type from "../types";

export default function (state, action) {
    switch (action.type) {
        case type.SET_ALERT: return [...state, action.payload]
        //case type.CLEAR_ALERT: return state.filter(alert => alert.id !== action.payload)
        case type.CLEAR_ALERT: return []
        default: return state;
    }
}