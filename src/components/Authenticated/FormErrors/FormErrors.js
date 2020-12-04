import React from 'react';

export const FormErrors = ({formErrors}) => {
    return (
        <div
            style={{
                padding: '10px',
                color: 'red',
                maxWidth: '200px'
            }}
            className='formErrors'>{
            typeof formErrors === 'string'
                ? <div>{formErrors}</div>
                : Object.keys(formErrors).map((fieldName, i) => {
                    if (formErrors[fieldName].length > 0) {
                        return (
                            <p style={{textAlign: 'center'}} key={i}>{formErrors[fieldName]}</p>
                        )
                    } else {
                        return '';
                    }
                })
        }
        </div>
    )
}

