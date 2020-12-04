import React, {Component} from 'react'
import classes from './MainQuestions.module.css'
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import {
    changeQuestionState,
    finishedQuiz,
    getQuizzes,
    questionSwitch
} from "../../redux/Actions/mainQuestion";
import {ResultAnswers} from "../ResultAnswers/ResultAnswers";
import DrawingAnswers from "../DrawingAnswers/DrawingAnswers";
import {Loading} from "../UI/Loading/Loading";

class MainQuestions extends Component {
    async componentDidMount() {
        await this.props.getQuizzes(this.props.match.params.id)
    }

    onClickHandler = (event, index) => {
        const currentAnswer = +event.target.dataset.index + 1
        const {indexQuiz, quizes, exit} = this.props

        const changeState = (boolean) => {
            this.props.changeQuestionState(index, quizes, boolean)
        }

        const responseCheck = (boolean, act) => {
            changeState(boolean)
            const ST = setTimeout(() => {
                switch (act) {
                    case 'finish':
                        this.props.finishedQuiz()
                        break;
                    case 'switch':
                        this.props.questionSwitch()
                        break;
                    default:
                        break;
                }
                clearTimeout(ST)
            }, 800)
        }

        const checkQuizzesLength = boolean => {
            if (this.props.quizes.length <= (indexQuiz + 1)) {
                responseCheck(boolean, 'finish')
            } else {
                responseCheck(boolean, 'switch')
            }
        }

        const quiz = this.props.quizes[indexQuiz]

        if (quiz.rightAnswer === currentAnswer && exit) {
            if (quiz.right || typeof quiz.right == "string") {
                checkQuizzesLength(true)
            }
            if (!quiz.right) {
                checkQuizzesLength(false)
            }
        } else if (quiz.right !== true && exit){
            changeState(false)
        }
    }

    render() {
        if (this.props.finish) {
            return (<div className={classes.mainResult}>
                        <ResultAnswers quizes={this.props.quizes}/>
                    </div>)
        }

        return this.props.loading
            ? <Loading />
            : <div className={classes.MainQuestion}>
                <div>
                    <div className={classes.Header}>
                        <h1>{this.props.quizes[this.props.indexQuiz].title}</h1>
                        <p>Question № {this.props.indexQuiz + 1}</p>
                    </div>
                    <div className={classes.Body}>
                        <DrawingAnswers
                            indexQuiz={this.props.indexQuiz}
                            className={this.props.stateAnswerClass}
                            quiz={this.props.quizes}
                            onClickHandler={this.onClickHandler}
                        />
                    </div>
                </div>
            </div>
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.render.quizes,
        loading: state.render.loading,
        indexQuiz: state.render.indexQuiz,
        finish: state.render.finish,
        stateAnswerClass: state.render.stateAnswerClass,
        exit: state.render.exit
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getQuizzes: id => dispatch(getQuizzes(id)),
        changeQuestionState: (icElement, quizes, boolean) => dispatch(changeQuestionState(icElement, quizes, boolean)),
        questionSwitch: () => dispatch(questionSwitch()),
        finishedQuiz: () => dispatch(finishedQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainQuestions))
