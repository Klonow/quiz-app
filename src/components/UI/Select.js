import React, { Fragment } from 'react'

export const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`
    return (
        <Fragment>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                { props.options.map((option, idx) => {
                    return (
                        <option
                            value={option.value}
                            key={idx}
                        >
                            {option.value}
                        </option>
                    )
                })}
            </select>
        </Fragment>
    )
}
