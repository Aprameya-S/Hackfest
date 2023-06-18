import React from 'react'
import './stat.scss'

const Stat = (props) => {
  return (
    <div className={`stat ${props.style}`}>
        <div className='text'>
            <h3>{props.stat}</h3>
            <p>{props.name}</p>
        </div>
    </div>
  )
}

export default Stat