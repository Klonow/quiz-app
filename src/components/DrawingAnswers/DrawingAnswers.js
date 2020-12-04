import React, {Component} from 'react'
import classes from './DrawingAnswers.module.css'

class DrawingAnswers extends Component {
    render() {
        return (
            <div className={classes.DrawingAnswer}>
                {this.props.quiz[this.props.indexQuiz].answers.map((answer, index) => {
                        return (
                            <div
                                data-index={index}
                                key={index}
                                className={
                                    this.props.className &&
                                    this.props.className[index]
                                        ? `${classes[this.props.className[index]]} ${classes['default']}`
                                        : classes['default']
                                }
                                onClick={event => this.props.onClickHandler(event, index)}
                            >
                                {answer}
                            </div>
                        )
                    }
                )}
            </div>
        )
    }
}

export default DrawingAnswers

