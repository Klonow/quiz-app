import { CHANGED_ERROR, AUTH_ERROR, AUTH_SUCCESS, LOGOUT } from '../Actions/actionsType'
import axios from 'axios'

export function userAuth(act, authData) {
    return async dispatch => {
        const url = act === 'register'
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'

        await axios.post(`${url}?key=AIzaSyB3fj1T75zzXZFOrctrnMSNUidqHe_6aYs`, authData)
            .then(response => {
                const { idToken, localId, expiresIn } = response.data

                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

                localStorage.setItem('token', idToken)
                localStorage.setItem('userId', localId)
                localStorage.setItem('expirationDate', expirationDate)

                dispatch(authSuccess(idToken))
                dispatch(autoLogout(expiresIn))
            })
            .catch(error => {
                switch (error.response.data.error.message) {
                    case 'EMAIL_NOT_FOUND':
                        dispatch(authError('A user with this email does not exist'))
                        break;
                    case 'INVALID_PASSWORD':
                        dispatch(authError('Invalid password'))
                        break;
                    case 'EMAIL_EXISTS':
                        dispatch(authError('A user with this email already exists'))
                        break;
                    default:
                        break;
                }
            });
    }
}

export function changedError() {
    return {
        type: CHANGED_ERROR
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        error
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
            console.log(time * 1000)
        }, time * 1000)
    }
}



export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
