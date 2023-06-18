import React from 'react'
import './footer.scss'

const Footer = () => {
  return (
    <footer id='footer'>
        © {new Date().getFullYear()} VitalFund
    </footer>
  )
}

export default Footer