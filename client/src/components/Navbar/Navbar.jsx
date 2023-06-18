import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ConnectButton from '../ConnnectButton/ConnectButton'
import GoogleAuth from '../GoogleAuth/GoogleAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { logo } from '../../assets'
import './navbar.scss'
import { signInWithGoogle, signOutFromGoogle } from '../../Firebase';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AuthContext } from '../../context/AuthContext';



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleSignOutContext } = useContext(AuthContext)
  const handleMenuClick = () => {    
    if(!menuOpen){
      setMenuOpen((prev) => !prev)
      document.querySelector('.line1').style.transform = 'rotate(45deg) translate(5px, 8px)'
      document.querySelector('.line2').style.opacity = '0'
      document.querySelector('.line3').style.transform = 'rotate(-45deg) translate(5px, -8px)'
      document.querySelector('.menu').style.transform = 'scaleY(1)'
    }
    else {
      setMenuOpen((prev) => !prev)
      document.querySelector('.line1').style.transform = 'rotate(0deg) translate(0px, 0px)'
      document.querySelector('.line2').style.opacity = '1'
      document.querySelector('.line3').style.transform = 'rotate(0deg) translate(0px, 0px)'
      document.querySelector('.menu').style.transform = 'scaleY(0)'
    }
  }

  const [isSignedIn, setIsSignedIn] = useState((localStorage.getItem("isSignedIn")==="false" || localStorage.getItem("isSignedIn")===null)? false : true);

  const handleSignOut = async () => {
    handleSignOutContext()
    handleMenuClick();
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".navbar", {
        y:0,
        duration: 0.5,
        delay: 0.1,
    })
  }, [])

  const valids = ["joshuatauro45@gmail.com", "aprameyashankar@gmail.com"]


  return (
    <>
    
    <div id='main-nav' className='navbar-wrapper'>
      <nav className='navbar'>
        <Link to='/' className='logo-div' onClick={menuOpen && handleMenuClick}>
          <img src={logo} referrerPolicy="no-referrer"/>
          <span>Vital Fund</span>
        </Link>
        <div className='right-container'>
          <div className='links-container'>
            {/* <Link to='/campaigns'>Campaigns</Link>
            <Link to='/create-campaign'>Create Campaign</Link>
            <Link to='/research/campaigns'>Research Campaigns</Link>
          <Link to='/research/create-campaign'>Create Research Campaign</Link> */}
          </div>
          <button className='menu-lines-btn' onClick={handleMenuClick}>
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </button>
          
          <div className='buttons-container flex'>
            <ConnectButton />
            <GoogleAuth />
          </div>
          
        </div>
        
      </nav>
      
      <div className='menu'>
        <div className='menu-wrapper'>
          <Link onClick={handleMenuClick} to='/campaigns'>Campaigns</Link>
          <Link onClick={handleMenuClick} to='/create-campaign'>Create Campaign</Link>
          <Link onClick={handleMenuClick} to='/research/campaigns'>Research Campaigns</Link>
          <Link onClick={handleMenuClick} to='/research/create-campaign'>Create Research Campaign</Link>
          {
            valids.includes(localStorage.getItem("userEmail")) && 
          <Link onClick={handleMenuClick} to='/admin'>Admin Dashboard</Link>
          }

          {!(localStorage.getItem("isSignedIn")==="false" || localStorage.getItem("isSignedIn")===null) && <>
                <Link to='/profile' onClick={handleMenuClick}>Profile</Link>
                <a onClick={handleSignOut} >Sign out</a>
              </>}
              
              
          <div className='buttons-container'>
            <ConnectButton />
            {/* <GoogleAuth /> */}
          </div>
        </div>
      </div>
    </div>
      
    </>

  )
}

export default Navbar