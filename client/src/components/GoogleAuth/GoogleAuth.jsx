import React, { useContext, useEffect, useState } from 'react'
import { signInWithGoogle, signOutFromGoogle } from '../../Firebase';
import './googleAuth.scss'
import { toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import { UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { AuthContext } from '../../context/AuthContext';


const GoogleAuth = () => {
    const [isSignedIn, setIsSignedIn] = useState((localStorage.getItem("isSignedIn")==="false" || localStorage.getItem("isSignedIn")===null)? false : true);
    // const [isSignedIn, setIsSignedIn] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { handleSignOutContext, handleSignInContext } = useContext(AuthContext)
    useEffect(() => {
        setIsSignedIn((localStorage.getItem("isSignedIn")==="false" || localStorage.getItem("isSignedIn")===null)? false : true)
    })
    //console.log(isSignedIn, localStorage.getItem("isSignedIn"))

    const handleSignIn = async () => {
        handleSignInContext()
    }
    const handleSignOut = async () => {
        handleSignOutContext()
    }
    // console.log(isSignedIn)

    const handleUserMenu = () => {    
        if(!userMenuOpen){
            setUserMenuOpen((prev) => !prev)
            document.querySelector('.user-menu').style.height = '83px'
            document.querySelector('.user-menu').style.borderTop = '1px solid rgb(112 112 112)'
            document.querySelector('.user-menu').style.top = '55px'
        }
        else {
            setUserMenuOpen((prev) => !prev)
            document.querySelector('.user-menu').style.height = '0px'
            document.querySelector('.user-menu').style.borderTop = 'none'
            document.querySelector('.user-menu').style.top = '54.5px'
        }
    }

    return (
        <>
            <div id="auth">
                {!isSignedIn && <button id="signin-btn" className='signin-btn' onClick={handleSignIn}> Sign In </button>}
                
                {isSignedIn &&
                    <div className='signout-container'>
                        <button className='signout-btn' onClick={handleUserMenu}><img src={localStorage.getItem("googleProfilePic")} alt=""/></button>
                        <div className="user-menu">
                            <Link to='/profile' onClick={handleUserMenu}><UserCircleIcon className='w-[20px]'/> Profile</Link>
                            <a onClick={handleSignOut} ><ArrowLeftOnRectangleIcon className='w-[20px]'/>Sign out</a>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default GoogleAuth