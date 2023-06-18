import React from 'react'
import './formfield.scss'

const FormField = (props) => {
  return (
    <label className='formfield'>
        {props.labelName && (
            <span className='label'>{props.labelName}</span>
        )}
        {props.isTextArea ? (
            <textarea
                required
                value={props.value}
                onChange={props.handleChange}
                type={props.inputType}
                rows={10}
                className=""
            />
        ) : (
            <input 
                required
                value={props.value}
                onChange={props.handleChange}
                type={props.inputType}
                step="0.1"
                className=""
            />
        )}
    </label>
  )
}

export default FormField