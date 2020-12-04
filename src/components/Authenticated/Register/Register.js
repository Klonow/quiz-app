import React, { Fragment } from 'react'
import Input from "../../UI/Input";
import {Button} from "../../UI/Button";

export default class Register extends React.Component {
    componentDidMount() {
        this.props.changeErrors()
    }

    render() {
        const {onChange, email, passwordOne, passwordTwo} = this.props

        const inputs = [
            {label: 'Email', type: 'email', className: 'form-control', name: 'email', onChange, value: email},
            {label: 'Password', type: 'password', className: 'form-control', name: 'passwordOne', onChange, value: passwordOne},
            {label: 'Confirm password', type: 'password', className: 'form-control', name: 'passwordTwo', onChange, value: passwordTwo},
        ]
        return (
                <Fragment>
                        <Input
                            inputs={inputs}
                        />
                    <Button
                        type="submit"
                        className={this.props.formValid ? this.props.buttonClassName : 'btn btn-primary'}
                        disabled={!this.props.formValid}
                        registerHandler={this.props.registerHandler}
                    > Sign Up </Button>
                </Fragment>
        )
    }
}
