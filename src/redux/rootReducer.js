import { combineReducers } from 'redux'
import createQuizReducer from "./Reducers/createQuizReducer";
import listQuestionReducer from "./Reducers/listQuestionReducer"
import mainQuestionReducer from "./Reducers/mainQuestionReducer";
import authReducer from "./Reducers/authReducer";

export default combineReducers({
    create: createQuizReducer,
    list: listQuestionReducer,
    render: mainQuestionReducer,
    auth: authReducer
})
