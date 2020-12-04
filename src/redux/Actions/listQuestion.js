import {UPDATED_LIST, NO_TESTS, LIST_RESET} from '../Actions/actionsType'
import axios from 'axios'

export function getQuize() {
    return async dispatch => {
        dispatch(resetList())

        const response = await axios.get('https://react-pratice-quiz.firebaseio.com/quizes.json')
        const list = []

        if(response.data) {
            Object.keys(response.data).forEach((key, index) => {
                list.push({
                    id: key,
                    name: `Quiz №${index + 1}`
                })
            })
        } else {
            dispatch(noTests())
            return;
        }

        dispatch(addQuizzesInList(list))

    }
}

export function addQuizzesInList(list) {
    return {
        type: UPDATED_LIST,
        list
    }
}

export function noTests() {
    return {
        type: NO_TESTS
    }
}

export function resetList() {
    return {
        type: LIST_RESET
    }
}
