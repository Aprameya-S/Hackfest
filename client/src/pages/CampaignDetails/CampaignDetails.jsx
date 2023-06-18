import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { ethers } from 'ethers'
import { useStateContext } from '../../context'
import { TransactionContext } from '../../context/TransactionContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { calculateBarPercentage, daysLeft } from '../../utils'
import { Transaction, Loader } from '../../components'
import './campaigndetails.scss'

const CampaignDetails = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  //setting state of the campaign which contains all data
  const { state } = useLocation();
  const navigate = useNavigate();
  const { getAllTransactions, currentAccount } = useContext(TransactionContext);
  const { address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amountDonated, setAmountDonated] = useState(0);
  const [donations, setDonations] = useState([]);

  function sum(obj) {
    return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
  }

  const fetchDonations = async () => {
      setIsLoading(true)
      const allDonations = await getAllTransactions()
      const campaignDonations = allDonations.filter((donations) => donations.beneficiaryAddress === state.owner).filter((donations) => donations.campaignName === state.title);
      var amount = 0;
      campaignDonations.map((donations) => {
        amount+=donations.amount
      })
      setDonations(campaignDonations) //all donations made to this campaign
      setAmountDonated(amount) //total donations made to this campaign
      setIsLoading(false)
    // console.log(campaignDonators, amount)
  }

  const progress = calculateBarPercentage(state.target, amountDonated);

  const remainingDays = daysLeft(state.deadline);
  useEffect(() => {
    setIsLoading(true)
    fetchDonations()
    setIsLoading(false)
    //console.log(currentAccount)

    setTimeout(() => {
      if(!currentAccount){
        toast("Connect to Metamask to view all details");
      }
    }, 1000);
    
  }, [])

  // console.log(state)

  return (
    <>
    {isLoading && <Loader title="Loading campaign"/>}
    <div className='cd-wrapper'>
      <h1 className='text-[25px]'>{state.title}</h1>
      <div className='top-section'>
        <div className='img-div'>
          <img src={state.image} alt="image" />
          <div className='progress-bar'>
            <div className="progress" style={{width: `${progress}%`}}></div>
          </div>
        </div>
        <div className='status'>
          <div className='block'>
            <h3>{currentAccount?amountDonated:"-"}</h3>
            <h4>Raised of {state.target}</h4>
          </div>
          <div className='block'>
            <h3>{(remainingDays>=0)?remainingDays:'-'}</h3>
            <h4>{(remainingDays===1)? 'Day Left' : (remainingDays<0)?'Campaign has ended':'Days Left'}</h4>
          </div>
          <div className='block'>
            <h3>{currentAccount?donations.length:"-"}</h3>
            <h4>{(donations.length===1)? 'Donation' : 'Donations'}</h4>
          </div>
        </div>
      </div>

      <div className='content-section'>
        <div className='content'>
          {(state.isResearchCampaign)?<h3>Research Lead: {state.researchLead}</h3>:<h3>Beneficiary: {state.beneficiaryName}</h3>}
          
          <span>Campaign was created by: </span>
          <div className='beneficiary'>
            {(state.isResearchCampaign)?<img src={state.organisationLogo} alt="" />:<img src={state.userProfilePic} alt="" />}
            
            <div>
              {(state.isResearchCampaign)?<h4>{state.organisationName}</h4>:<h4>{state.userName}</h4>}
              
              <h5>[{state.owner}]</h5>
            </div>
          </div>
          <h3>Story</h3>
          <p className='story'>
            {state.description}<br/><br/>
            <span><a href={state.documentUrl}>Click here</a> to view documents.</span>
          </p>  
        </div>

        <div className='transact'>
          <h2>Fund</h2>
          <Transaction state={state}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default CampaignDetails