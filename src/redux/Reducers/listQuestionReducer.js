import {LIST_RESET, NO_TESTS, UPDATED_LIST} from "../Actions/actionsType";

const initialState = {
    listQuizzes: [],
    errors: false
}

export default function listQuestionReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATED_LIST:
            const result = typeof action.list === 'string' ? action.list : [...action.list]

            return {
                errors: false,
                listQuizzes: result
            }
        case NO_TESTS:
            return {
                listQuizzes: [],
                errors: true
            }
        case LIST_RESET:
            return {
                listQuizzes: [],
                errors: false
            }
        default:
            return state
    }
}

