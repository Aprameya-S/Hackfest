import './profile.scss'
import { useStateContext } from '../../context'
import { TransactionContext } from '../../context/TransactionContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'
import { CampaignCard, Loader } from '../../components'
import React, { useState, useEffect, useContext } from 'react'
import { ArrowUpRightIcon, ArrowDownLeftIcon } from '@heroicons/react/24/outline';

const Profile = () => {
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [userTransactions, setUserTransactions] = useState([]);
    const [recievedDonations, setRecievedDonations] = useState([]);
    const { address, contract, getUserCampaigns } = useStateContext();
    const { currentAccount, getAllTransactions } = useContext(TransactionContext);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const campaigns = await getUserCampaigns();
            setCampaigns(campaigns);

            const transactions = await getAllTransactions();
            // console.log(transactions) //all transactions

            const uTransactions = [];
            const Donations = [];
            transactions.map((transaction) => {
                //If you are the donor
                if(transaction.donorAddress.toUpperCase() === currentAccount.toUpperCase()){
                    uTransactions.push(transaction)
                }
                //If you are the beneficiary
                if(transaction.beneficiaryAddress.toUpperCase() === currentAccount.toUpperCase()){
                    Donations.push(transaction)
                }
            })
            // console.log(Donations)
            setUserTransactions(uTransactions);
            setRecievedDonations(Donations);
        } catch(error) {
            console.log(error)
        }
        
        setIsLoading(false)
    }

    //check if user is authenticated
    useEffect(() => {
        if(!currentAccount || !address || ((localStorage.getItem("isSignedIn")==="false" || localStorage.getItem("isSignedIn")===null))){
            //console.log(localStorage.getItem("isSignedIn"))
            if(localStorage.getItem("isSignedIn")==="false" || localStorage.getItem("isSignedIn")===null){
                toast.error("Please Sign In and try again.")
            }
            else {
                toast.error("Please connect your Metamask wallet and try again.")
            }
            navigate('/')
            return
        }
        if(contract) {
            fetchUserData()
        }
    },  [address, contract])

    const handleNavigate = (campaign) => {
        //pass campaign object into the route
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
        // console.log(campaign)
    }

    const handleRowExpand = (ele) => {
        if(ele.style.height=='100%'){
            ele.style.height='80.8px'
        }
        else{
            ele.style.height='100%'
        }
    }

    //currently connected user
    // console.log(currentAccount)

    return (
        <div className='profile-page-wrapper'>
            {isLoading && <Loader title=""/>}
            <section className='user-info'>
                <img src={localStorage.getItem("googleProfilePic")} alt="" referrerPolicy="no-referrer"/>
                <div className="info">
                    <h3>{localStorage.getItem("googleDisplayName")}</h3>
                    <h4>{currentAccount}</h4>
                </div>
            </section>
            <section className='user-campaigns-section'>
                <div className='campaigns-page-wrapper'>
                    <h1><span></span> {address ? ((campaigns.length===1)?'Your campaign':((campaigns.length===0)?'You have no active campaigns. ':'Your campaigns')) : 'Connect wallet to view your profile'}
                        {campaigns.length===0 && <Link to={'/create-campaign'}>Create campaign</Link>}
                    </h1>
                    <div className='cards-container'>
                        {campaigns.length > 0
                            && campaigns.map((campaign, index) =>
                            <CampaignCard
                                key={index}
                                image={campaign.image}
                                avatar={campaign.userProfilePic}
                                title={campaign.title}
                                userName={campaign.userName}
                                beneficiaryName={campaign.beneficiaryName}
                                description={campaign.description}
                                handleClick={() => handleNavigate(campaign)}
                                buttonName="Check status"
                            />                 
                        )}
                    </div>
                </div>
            </section>
            <section className='donations-section'>

                <div className='your-donations'>
                    <h1 className='title'>
                        <span></span> {address ? ((userTransactions.length===0)?'You have not made any donations. ': 'Your donations') : ''}
                        {userTransactions.length===0 && <Link to={'/campaigns'}>View campaigns</Link>}
                    </h1>
                    <div className={`table ${(userTransactions.length===0)?'hidden':''}`}>
                        {userTransactions.map((transaction, index) => (
                            <div className='row-container' key={index} onClick={(e) => handleRowExpand(e.currentTarget)}>
                            <div className='data-row'>
                                <div className="left">
                                    <img src={transaction.beneficiaryProfilePic} alt="" />
                                    <div>
                                        <h2>{transaction.beneficiaryName}</h2>
                                        
                                        <h3>Campaign name: {transaction.campaignName}</h3> 
                                    </div>
                                   
                                </div>
                                <div className="right">
                                    <div>
                                       <h4><ArrowUpRightIcon className='w-[20px] h-[20px]'/> {transaction.amount} ETH</h4>
                                       <h3>[{transaction.beneficiaryAddress}]</h3>    
                                    </div>
                                                     
                                    <p>{transaction.timestamp}</p>
                                </div>
                            </div>
                            <div className="data-message">
                                <p>{transaction.message}</p>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`donations-recieved ${(campaigns.length===0)?'hidden':''}`}>
                    <h1 className='title'>
                        <span></span> {address ? ((recievedDonations.length===0)?'You have not recieved any donations': 'Recieved donations') : ''}
                    </h1>
                    {(recievedDonations.length!==0) && 
                        <div className='table'>
                            <div className='data-container'>
                                {recievedDonations.map((transaction, index) => (
                                    <div className='row-container' key={index} onClick={(e) => handleRowExpand(e.currentTarget)}>
                                    <div className='data-row'>
                                    <div className="left">
                                        <img src={transaction.donorProfilePic} alt="" />
                                        <div>
                                            <h2>{transaction.donorName}</h2>         
                                            <h3>Campaign name: {transaction.campaignName}</h3> 
                                        </div>
                                       
                                    </div>
                                    <div className="right">
                                        <div>
                                           <h4><ArrowDownLeftIcon className='w-[20px] h-[20px]'/> {transaction.amount} ETH</h4>
                                           <h3>[{transaction.donorAddress}]</h3>    
                                        </div>
                                                         
                                        <p>{transaction.timestamp}</p>
                                    </div>
                                </div>
                                <div className="data-message">
                                    <p>{transaction.message}</p>
                                </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    }
                    
                </div>     
            </section>
        </div>
        
        
    )
}

export default Profile