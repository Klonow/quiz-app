import React, {Fragment} from 'react'
import Input from "../../UI/Input";
import {Button} from "../../UI/Button";

export default class Login extends React.Component {
    componentDidMount() {
        this.props.changeErrors()
    }

    render() {
    const {onChange, email, passwordOne} = this.props
    const inputs = [
            {label: 'Email', type: 'email', className: 'form-control', name: 'email', onChange, value: email},
            {label: 'Password', type: 'password', className: 'form-control', name: 'passwordOne', onChange, value: passwordOne}
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
            >Login in</Button>
        </Fragment>
    )
}
}
