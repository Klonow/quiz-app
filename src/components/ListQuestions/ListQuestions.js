import React, {Component} from 'react'
import classes from './ListQuestions.module.css'
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux'
import {getQuize} from "../../redux/Actions/listQuestion";
import {Loading} from "../UI/Loading/Loading";

class ListQuestions extends Component {
    componentDidMount() {
        this.props.getQuize()
    }

    listRendering() {
        if(this.props.errors) return <h1>{this.props.errors}</h1>

        return this.props.listQuizzes.map((quiz, index) => {
            return <li key={index}><NavLink to={'/list/' + quiz.id}>{quiz.name}</NavLink></li>
        })

    }

    render() {
        const loader = this.props.errors ? <h1>Нет тестов</h1> : <Loading />

        return (
            <div className={classes.listQuestion}>
                    <h1>List question</h1>
                    {
                        <ol className={classes.rectangle}>
                            {
                                this.props.listQuizzes.length
                                    ? this.listRendering()
                                    : loader
                            }
                        </ol>
                    }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listQuizzes: state.list.listQuizzes,
        errors: state.list.errors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getQuize: () => dispatch(getQuize())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListQuestions)


