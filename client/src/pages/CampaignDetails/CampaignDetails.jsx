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
import { badge } from '../../assets'

import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../Firebase'
import { doc, updateDoc } from "firebase/firestore";

const CampaignDetails = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // const getCampaigns = async() => {
    //   const campaignQuery = query(campaignsRef)
    //   const c = await getDocs(campaignQuery)
    //   setFirebaseCampaigns(c.docs.map(chat => [chat.data(), chat.id]))
    // }

  }, []);

  //setting state of the campaign which contains all data
  const { state } = useLocation();
  const navigate = useNavigate();
  const { getAllTransactions, currentAccount } = useContext(TransactionContext);
  const { address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amountDonated, setAmountDonated] = useState(0);
  const [donations, setDonations] = useState([]);

  const campaignsRef = collection(db, "campaigns")
  // const [firebaseCampaigns, setFirebaseCampaigns] = useState([])
  const [isVerified, setIsVerified] = useState(false)
  // console.log(firebaseCampaigns)

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

      const campaignQuery = query(campaignsRef)
      const c = await getDocs(campaignQuery)
      const camp=[];
      c.docs.map(campaign => {
        camp.push([campaign.data(), campaign.id])
      })
      
      camp.forEach((c) => {
        console.log(c[0].address,state.owner)
        if(c[0].verified==true){
          if(c[0].address==state.owner && c[0].name==state.beneficiaryName){
            setIsVerified(true)
          }
        }
        
      })
      
      setIsLoading(false)
    // console.log(campaignDonators, amount)
  }
  console.log(isVerified)

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
            {isVerified && <span className='flex text-green-600 mb-[10px]'><img src={badge} className='mr-[5px]' alt="Verified" />Verified</span>}
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