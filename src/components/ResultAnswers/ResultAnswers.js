import React from 'react'
import classes from './ResultAnswers.module.css'

export const ResultAnswers = props => {
        return props.quizes.map((quiz, index) => {
                return (
                        <div key={index} className={classes.mainList}>
                                <div>{`Question №${index + 1} ${quiz.title}:`}</div>
                                <div>
                                  {
                                    quiz.right
                                      ? <span className={classes.resultCheck + " material-icons"}>check</span>
                                      : <span className={classes.resultClose + " material-icons"}>close</span>
                                  }
                                </div>
                         </div>
                )
        })
}
