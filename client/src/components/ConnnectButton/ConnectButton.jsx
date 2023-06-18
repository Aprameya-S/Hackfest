import React, { useContext, useEffect } from 'react'
import { TransactionContext } from '../../context/TransactionContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router'
import { useStateContext } from '../../context'
import './ConnectButton.scss'


const ConnectButton = () => {
    const { connectWallet } = useContext(TransactionContext);
    const { connect, address } = useStateContext();
    const navigate = useNavigate();

    const handleConnect = () => {
        connectWallet();
        connect();
    }

    return (
        <>
            
            <button
                type='button'
                // onClick={connectWallet}
                onClick={() => {
                    if(address) toast("Wallet is already connected.")
                    else handleConnect()
                }}
                className="connect-btn gradient-button"
            >
                {address ? <p><span className='green-dot'></span> Connected</p> : 'Connect Wallet'}
            </button>
        </>
    
  )
}

export default ConnectButton