import { UPDATE_QUIZZES, QUESTION_SWITCH, CHANGE_QUESTION_STATE, FINISHED_QUIZ } from '../Actions/actionsType'
import axios from 'axios'

export function getQuizzes(id) {
    return async dispatch => {
        try {
            const response = await axios.get(`https://react-pratice-quiz.firebaseio.com/quizes/${id}.json`)
            const quizes = [...Object.values(response.data)]
            dispatch(addChangesInQuiz(quizes))
        } catch (e) {
            console.log(e)
        }
    }
}

export function addChangesInQuiz(quizes) {
    return {
        type: UPDATE_QUIZZES,
        quizes
    }
}

export function questionSwitch() {
    return {
        type: QUESTION_SWITCH
    }
}

export function changeQuestionState(icElement, quizes, boolean) {
    return {
        type: CHANGE_QUESTION_STATE,
        icElement, quizes, boolean
    }
}

export function finishedQuiz() {
    return {
        type: FINISHED_QUIZ
    }
}
