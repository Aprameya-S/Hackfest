import React from 'react'

const Input = (props) => {
  return (
    <div className='flex gap-3'>
        <label>{props.placeholder}</label>
        <input
          type={props.type}
          onChange={(e) => props.handleChange(e, props.name)}
          step="0.0001"
          value={props.value}
          className="px-2 bg-black text-white rounded-[5px]"
        />
    </div>
  )
}

export default Input