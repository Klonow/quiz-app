import React, { Component } from 'react'
import {logout} from "../../../redux/Actions/register";
import {connect} from 'react-redux'
import {Redirect} from "react-router";

class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }

    render() {
        return <Redirect to={'/'} />
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
