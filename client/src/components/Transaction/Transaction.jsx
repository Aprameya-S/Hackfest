import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../../context/TransactionContext'
import './transaction.scss'
import {Loader} from '../../components'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Transaction = (props) => {
  //here the props contain info about the campaign owner
  const [isLoading, setIsLoading] = useState(false);
  const { connectWallet, currentAccount, sendTransaction, getBeneficiaryDetails} = useContext(TransactionContext);

  useEffect(() => {
    // console.log(props.state)
    //setting to address for transactions
    getBeneficiaryDetails({beneficiaryAddress: props.state.owner, beneficiaryName: props.state.userName, beneficiaryProfilePic: props.state.userProfilePic, campaignName: props.state.title})
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if user in signed in
      if(localStorage.getItem("isSignedIn")==="false" || localStorage.getItem("isSignedIn")===null){
        throw('Please Sign In and try again.')
      }

      // const { amount, message, keyword } = formData;
    
      e.preventDefault()
      // if(!amount || !message || !keyword) return;
      await sendTransaction(formData);
      toast.success("You have successfully donated to " + props.state.owner);
      
    }
    catch(error) {
      if(error === 'Please Sign In and try again.'){
        toast.error(error)
      }
      else{
        //console.log(error.message)
        toast.error("Wallet not connected. Please connect to Metamask and try again.")
      }
      setIsLoading(false);
    }
    //keyword is the name
    
    setIsLoading(false);
  }
  
  const [formData, setformData] = useState({
    beneficiaryAddress: props.state.owner,
    donorName: localStorage.getItem("googleDisplayName"),
    donorProfilePic: localStorage.getItem("googleProfilePic"),
    beneficiaryName: (props.state.isResearchCampaign)?props.state.organisationName:props.state.userName,
    beneficiaryProfilePic: (props.state.isResearchCampaign)?props.state.organisationLogo:props.state.userProfilePic,
    campaignName: props.state.title,
    amount: "",
    message: ""
  });

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  // console.log(formData)

  return (
    <>
    {isLoading && <Loader title="Transaction in progress.."/>}
    <form className='not-a-form' onSubmit={handleSubmit}>
        <button
          type='button'
          onClick={connectWallet}
          className={`connect-wallet ${(currentAccount)?'pointer-events-none rounded-[5px] w-full':'pointer-events-auto rounded-[20px] w-fit'} `}
        >
          {(currentAccount)?<p>Connected as donor:<br/>{currentAccount}</p>:<p>Connect wallet as donor</p>}
        </button>


        <label>Enter amount(in ETH) *</label>
        <input type="number" onChange={(e) => handleChange(e, 'amount')} step='0.001' required aria-required/>

        <label>Your message *</label>
        <textarea type="text" onChange={(e) => handleChange(e, 'message')} required aria-required/>

        <button type='submit' className="send-amt gradient-button">Send</button>
    </form>
    </>
    
  )
}

export default Transaction