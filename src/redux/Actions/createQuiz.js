import {ADD_QUESTION, CREATE_QUIZ, INCREASE_RIGHT_ANSWER} from '../Actions/actionsType'
import axios from 'axios'

export function addQuestion(resultQuestion) {
    return {
        type: ADD_QUESTION,
        resultQuestion
    }
}

export function createQuiz(quiz) {
    return async dispatch => {
        await axios.post('https://react-pratice-quiz.firebaseio.com/quizes.json', quiz)
        dispatch(getAllQuizes())
    }
}

export function getAllQuizes() {
    return {
        type: CREATE_QUIZ
    }
}

export function increaseRightAnswer(value) {
    return {
        type: INCREASE_RIGHT_ANSWER,
        value
    }
}
