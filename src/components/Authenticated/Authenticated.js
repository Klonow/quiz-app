import React, {Component} from 'react'
import {FormErrors} from "./FormErrors/FormErrors";
import is from 'is_js'
import {connect} from 'react-redux'
import {changedError, userAuth} from "../../redux/Actions/register";
import {withRouter} from "react-router";
import Login from "./LoginIn/Login";
import Register from "./Register/Register";
import {validation} from "../auxiliary";
import classes from './Authenticated.module.css'

class Authenticated extends Component {
    state = {
        validation: {
            email: '',
            passwordOne: '',
            passwordTwo: ''
        },
        formErrors: {
            existingUser: '',
            email: '',
            password: ''
        },
        emailValid: false,
        passwordValid: false,
        formValid: false
    }

    changeErrors = () => {
        this.setState({
            formErrors: {
                existingUser: '',
                email: '',
                password: ''
            }
        })
    }

    validateField = (name, type, value) => {
        let emailValid = this.state.emailValid
        let passwordValid = this.state.passwordValid
        let fieldValidationErrors = this.state.formErrors

        const errorChecking = minLength => {
            passwordValid = value.length >= minLength
            return fieldValidationErrors[type] = validation(value.length, passwordValid, minLength)
        }

        switch (type) {
            case 'email':
                emailValid = is.email(value)
                fieldValidationErrors[name] = emailValid ? '' : 'Enter a valid Email'
                break;
            case 'password':
                const minLength = 6

                if (this.props.location.hash === '#login') {
                    errorChecking(minLength)
                    break;
                }


                const {passwordOne, passwordTwo} = this.state.validation
                passwordValid = passwordOne === passwordTwo

                if (!passwordValid) {
                    fieldValidationErrors[type] = 'Password mismatch'
                } else {
                    errorChecking(minLength)
                }

                break;
            default:
                break;
        }

        this.setState({
            emailValid, passwordValid,
            formErrors: fieldValidationErrors
        }, this.validateForm)
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid && this.state.passwordValid
        })
    }

    handleUserInput = (event) => {
        const {name, value, type} = event.target

        if(this.props.existingUser.length) {
            this.props.existingAuth()
        }

        this.setState(() => {
            this.state.validation[name] = value
        }, () => {
            this.validateField(name, type, value)
        })
    }

    registerHandler = async event => {
        event.preventDefault()

        const authData = {
            email: this.state.validation.email,
            password: this.state.validation.passwordOne,
            returnSecureToken: true
        }

        const act = this.props.location.hash.slice(1)
        this.props.userAuth(act, authData)

    }

    render() {
        return (
            <div className={classes.Authenticated}>
                <div className={classes.main}>
                    <div className="panel panel-default">
                        <FormErrors
                            formErrors={
                                this.props.existingUser.length
                                    ? this.props.existingUser
                                    : this.state.formErrors
                            }
                        />
                    </div>

                    <div className={classes.menu}>
                        <div><a
                                href="#register"
                                className={ this.props.location.hash === '#register' ? classes.active : null}
                             >Sign Up</a></div>
                        <div><a
                                href="#login"
                                className={ this.props.location.hash === '#login' ? classes.active : null}
                                >Log In</a></div>
                    </div>

                    <form>
                        {
                            this.props.location.hash === '#register'
                                ? <Register
                                    {...this.state}
                                    onChange={this.handleUserInput}
                                    registerHandler={this.registerHandler}
                                    changeErrors={this.changeErrors}
                                    buttonClassName={classes.hoverBtn}
                                    />
                                : <Login
                                    {...this.state}
                                    onChange={this.handleUserInput}
                                    registerHandler={this.registerHandler}
                                    changeErrors={this.changeErrors}
                                    buttonClassName={classes.hoverBtn}
                                    />
                            }
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        existingUser: state.auth.existingUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userAuth: (act, authData) => dispatch(userAuth(act, authData)),
        existingAuth: () => dispatch(changedError())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authenticated))
