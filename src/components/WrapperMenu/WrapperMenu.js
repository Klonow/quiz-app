import React, { Component, Fragment } from 'react'
import classes from './WrapperMenu.module.css'
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'

class WrapperMenu extends Component {
    render() {
        let renderLinks = (
            <ul>
                <li><NavLink exact to='/' activeClassName={classes.active}>Home</NavLink></li>
                <li><NavLink to='/list' activeClassName={classes.active}>Quizzes list</NavLink></li>
                <li>
                    <NavLink to='/registration#register' activeClassName={classes.active}>
                        <span className="material-icons">login</span>
                    </NavLink>
                </li>
            </ul>
        )

        if(this.props.isAuthenticated) {
            renderLinks = (
                <ul>
                    <li><NavLink exact to='/' activeClassName={classes.active}>Home</NavLink></li>
                    <li><NavLink to='/list' activeClassName={classes.active}>Quizzes list</NavLink></li>
                    <li><NavLink to='/create' activeClassName={classes.active}>Create quiz</NavLink></li>
                    <li>
                        <NavLink to='/logout' activeClassName={classes.active}>
                            <span className="material-icons">clear</span>
                        </NavLink>
                    </li>
                </ul>
            )
        }

        return (

            <div className={classes.Wrapper}>
                <div className={classes.WrapperMenu}>
                    <nav>
                        { renderLinks }
                    </nav>
                </div>
                <Fragment>
                    { this.props.children }
                </Fragment>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(WrapperMenu)
