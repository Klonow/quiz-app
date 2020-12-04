import {ADD_QUESTION, CREATE_QUIZ, INCREASE_RIGHT_ANSWER} from "../Actions/actionsType";

const initialState = {
    quiz: [],
    rightAnswer: 1
}

export default function createQuizReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.resultQuestion]
            }
        case CREATE_QUIZ:
            return {
                quiz: []
            }
        case INCREASE_RIGHT_ANSWER:
            return {
                ...state,
                rightAnswer: action.value
            }
        default:
            return state
    }
}
