import {AUTH_SUCCESS, LOGOUT} from "../Actions/actionsType";

const initialState = {
    token: null,
    existingUser: ''
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token
            }
        case LOGOUT:
            return {
                ...state,
                token: null
            }
        case 'AUTH_ERROR':
            return {
                ...state,
                existingUser: action.error
            }
        case 'CHANGED_ERROR': {
            return {
                ...state,
                existingUser: ''
            }
        }
        default:
            return state
    }
}
