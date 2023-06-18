import React, { useEffect } from 'react'
import './loader.scss'

const Loader = (props) => {

  return (
    <div className="loader-container">

      <div className="dna">
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
        <div className="strand" ></div>
      </div>
      <p className="loader-text">{props.title}</p>
    </div>
  )
}

export default Loader