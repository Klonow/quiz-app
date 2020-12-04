import React, { Component } from 'react'
import { connect } from "react-redux"
import {addQuestion, createQuiz, increaseRightAnswer} from "../../redux/Actions/createQuiz";
import {Select} from "../UI/Select";
import classes from './CreateQuiz.module.css'
import Input from "../UI/Input";
import {FormErrors} from "../Authenticated/FormErrors/FormErrors";
import {Button} from "../UI/Button";
import {arrayFill, checkErrorControls} from "../auxiliary";

function inState(length = 3) {
    const answers = ['Question: ']
    arrayFill(length,  (index) => {
        answers.push('Answer ' + (index + 1) + ':')
    })

    return answers.map(answer => {
        return {
            answer,
            value: ''
        }
    });
}

function valueSelect(length = 3) {
    return new Array(length).fill('').map((_, index) => {
        return {
            value: index + 1
        }
    })
}

class CreateQuiz extends Component {
    state = {
        formControls: inState(),
        formErrors: {
            question: ''
        },
        isValid: false
    }

    addAnswer = length => {
        const setErrors = message => {
            this.setState({
                formErrors: {
                    question: message
                }
            })
            return;
        }

        if(length < 2) {
            setErrors('Тест должен иметь не менее 2 ответов')
            return;
        }

        if(length > 10) {
            setErrors('Максимум 10 ответов')
            return;
        }

        const controls = inState(length)

        this.state.formControls.map((answer, index) => {
            if(answer.value.length) {
                if(!controls[index]) return;

                controls[index].value = answer.value
            }
        })

        let formErrors = this.state.formErrors
        formErrors.question = checkErrorControls(controls)

        this.setState({
            formControls: controls,
            formErrors,
            isValid: !formErrors.question
        })
    }


    addQuestion = () => {
        const formControls = this.state.formControls
        const title = formControls[0].value
        const answers = []

        for(let i = 1; i < formControls.length; i++) {
            answers.push(formControls[i].value)
        }

        const resultQuestion = {
            title,
            answers: [...answers],
            rightAnswer: this.props.rightAnswer,
            index: this.props.quiz.length,
            right: ''
        }

        this.props.addQuestion(resultQuestion)

        this.setState({
            formControls: inState(),
            isValid: false,
        })
    }

    addQuize = async () => {
        await this.addQuestion()
        this.props.createQuiz(this.props.quiz)
    }

    setValueInputs = (value, index) => {
        const formControls = [...this.state.formControls]
        let formErrors = this.state.formErrors

        formControls[index].value = value

        formErrors.question = checkErrorControls(this.state.formControls)

        this.setState({
            formErrors,
            formControls,
            isValid: !formErrors.question
        })
    }

    renderControls () {
        const inputs = this.state.formControls.map(({answer, value}, index) => {
            return {
                label: answer,
                onChange: event => this.setValueInputs(event.target.value, index),
                value
            }
        })

        return (
            <Input
                inputs={inputs}
            />
        )
    }

    onChange = event => {
        this.props.increaseRightAnswer(+event.target.value)
    }

    render() {
        return (
            <div className={classes.createQuiz}>
                    <h1>Test Creation Editor</h1>
                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors}/>
                    </div>
                    <form onSubmit={(event) => event.preventDefault()}>

                        {this.renderControls()}

                        <Button
                            registerHandler={this.addAnswer.bind(this, this.state.formControls.length)}
                        >Add answer</Button>

                        <Button
                            registerHandler={this.addAnswer.bind(this, this.state.formControls.length - 2)}
                        >Delete answer</Button>

                        <div>
                            <b>Right answer:</b>
                            <Select
                                value={this.props.rightAnswer}
                                onChange={this.onChange}
                                options={[
                                        ...valueSelect(this.state.formControls.length - 1)
                                ]}
                            />
                        </div>

                        <Button
                            disabled={!this.state.isValid}
                            registerHandler={this.addQuestion}
                            className={this.state.isValid ? classes.hoverBtn : null}
                        > Add question </Button>

                        <Button
                            disabled={!this.state.isValid}
                            registerHandler={this.addQuize}
                            className={this.state.isValid ? classes.hoverBtn : null}
                        >Create quiz</Button>
                    </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz,
        rightAnswer: state.create.rightAnswer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestion: resultQuestion => dispatch(addQuestion(resultQuestion)),
        createQuiz: quiz => dispatch(createQuiz(quiz)),
        increaseRightAnswer: value => dispatch(increaseRightAnswer(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz)
