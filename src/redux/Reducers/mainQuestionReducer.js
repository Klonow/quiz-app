import {
    CHANGE_QUESTION_STATE,
    FINISHED_QUIZ,
    QUESTION_SWITCH,
    UPDATE_QUIZZES
} from "../Actions/actionsType";
import { correctAnswer } from "../../components/auxiliary";

const initialState = {
    quizes: [],
    loading: true,
    stateAnswerClass: null,
    finish: false,
    indexQuiz: 0,
    exit: true
}

export default function mainQuestionReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_QUIZZES:
            return {
                quizes: [...action.quizes],
                loading: false,
                indexQuiz: 0,
                exit: true
            }
        case QUESTION_SWITCH:
            return {
                quizes: [...state.quizes],
                indexQuiz: state.indexQuiz + 1,
                stateAnswerClass: null,
                exit: true
            }
        case CHANGE_QUESTION_STATE:
            const quizes = [...state.quizes]
            quizes[state.indexQuiz].right = action.boolean

            return {
                stateAnswerClass: {
                    [action.icElement]:
                        correctAnswer(state, action.icElement)
                            ? 'successAnswer'
                            : 'activeAnswer'
                },
                quizes: [...state.quizes],
                indexQuiz: state.indexQuiz,
                exit: !correctAnswer(state, action.icElement) //checked(state, action.icElement) ? false : true
            }
        case FINISHED_QUIZ:
            return {
                quizes: [...state.quizes],
                finish: true,
                indexQuiz: 0,
                stateAnswerClass: null
            }
        default:
            return state
    }
}
