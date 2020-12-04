import React from 'react'

const Input = props => {
    return props.inputs.map((input, index) => {
        return (
            <div key={index}>
                <label htmlFor={Math.random()}>{input.label}</label>
                <input
                    className={input.className || null}
                    type={input.type || 'text'}
                    onChange={input.onChange}
                    value={input.value}
                    name={input.name || null}
                />
            </div>
        )
    })
}

export default Input

