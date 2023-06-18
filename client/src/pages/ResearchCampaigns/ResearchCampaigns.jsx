import { useNavigate } from 'react-router-dom'
import { CampaignCard, Loader } from '../../components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context'
// import './campaigns.scss'

const ResearchCampaigns = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getResearchCampaigns } = useStateContext();
  const navigate = useNavigate();


  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getResearchCampaigns();
    setCampaigns(data);
    
    setIsLoading(false);
  }
  useEffect(() => {
    if(contract) {
      fetchCampaigns()
    }
  },  [address, contract])

  const handleNavigate = (campaign) => {
    //pass campaign object into the route
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  // console.log(campaigns)

  return (
    <div className='campaigns-page-wrapper'>
      {isLoading && <Loader title=""/>}

      <header className='page-header'>
        {(campaigns.length===0)?
          <span><h1>No active</h1></span>:
          <span><h1>Active</h1></span>
        }
        <div className="line"></div>
        <span><h1>research</h1></span>
        <div className="line"></div>
        <span><h1>campaigns</h1></span>
        <div className="line"></div>
      </header>

      <div className='cards-container'>
        {campaigns.length > 0
            && campaigns.reverse().map((campaign, index) =>
            <CampaignCard
              key={index}
              image={campaign.image}
              avatar={campaign.organisationLogo}
              title={campaign.title}
              userName={campaign.organisationName}
              beneficiaryName={campaign.researchLead}
              description={campaign.description}
              isResearchCampaign={campaign.isResearchCampaign}
              handleClick={() => handleNavigate(campaign)}
            />                 
        )}
      </div>
    </div>

  )
}

export default ResearchCampaigns