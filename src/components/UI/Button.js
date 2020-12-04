import React from 'react'

export const Button = props => {
    return (
        <button
            className={props.className}
            type={props.type}
            disabled={props.disabled}
            onClick={props.registerHandler}
        >{props.children}</button>
    )
}
