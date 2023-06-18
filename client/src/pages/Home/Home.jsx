import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Hero, Stat, CampaignCard, Loader } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../context'
import { contractImg, fastImg, logoArt, transactionImg } from '../../assets'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './home.scss'

const Home = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const { address, contract, getCampaigns, getResearchCampaigns } = useStateContext();
  const [campaigns, setCampaigns] = useState([]);
  const [researchCampaigns, setResearchCampaigns] = useState([]);
  const navigate = useNavigate();
 
  const fetchCampaignsAndTransactions = async () => {
    const data = await getCampaigns();
    const researchData = await getResearchCampaigns();
    setCampaigns(data);
    setResearchCampaigns(researchData);
    // console.log(researchData)
  }
  useEffect(() => {
    if(contract) {
      fetchCampaignsAndTransactions()
    }
    // console.log(totalETH, totalETHTransactions)
  },  [address, contract])


  const handleNavigate = (campaign) => {
    //pass campaign object into the route
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    // console.log(campaign)
  }

  // why us section parallax
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1000px)", () => {
      gsap.to(".text-box-1", {
        scrollTrigger: {
          trigger: ".text-box-1",
          scrub: true,
        },
        y: 100,
        ease: "none",
      })
      gsap.to(".img-box-1", {
        scrollTrigger: {
          trigger: ".img-box-1",
          scrub: true,
        },
        y: -80,
        ease: "none",
      })
      gsap.to(".img-box-1 img", {
        scrollTrigger: {
          trigger: ".img-box-1",
          scrub: true,
        },
        y: -50,
        ease: "none",
      })
      gsap.to(".text-box-2", {
        scrollTrigger: {
          trigger: ".img-box-1",
          scrub: true,
        },
        y: -200,
        ease: "none",
      })
      gsap.to(".img-box-2", {
        scrollTrigger: {
          trigger: ".img-box-2",
          scrub: true,
        },
        scale:0.9,
        ease: "none",
      })
      gsap.to(".img-box-2 img", {
        scrollTrigger: {
          trigger: ".img-box-2",
          scrub: true,
        },
        y: -100,
        ease: "none",
      })
      gsap.to(".text-box-3", {
        scrollTrigger: {
          trigger: ".img-box-2",
          scrub: true,
        },
        y: -500,
        ease: "none",
      })
      gsap.to(".img-box-3", {
        scrollTrigger: {
          trigger: ".img-box-2",
          scrub: true,
        },
        y: -200,
        scale: 1.3,
        ease: "none",
      })
      gsap.to(".img-box-3 img", {
        scrollTrigger: {
          trigger: ".img-box-3",
          scrub: true,
        },
        y: -50,
        ease: "none",
      })
      gsap.to(".text-box-4", {
        scrollTrigger: {
          trigger: ".img-box-3",
          scrub: true,
        },
        y: -400,
        ease: "none",
      })
    });

    
  }, []);

  return (
    <div className='home-wrapper'>
      {/* <Loader /> */}
      <Hero />

      <section className='about-section'>
        <h1>A space to make<br/>a real <span>impact</span></h1>
        <p>
        <span>Our mission</span> is to provide a secure, transparent, and efficient way to fund medical treatments through the power of blockchain technology and cryptocurrency transactions.<br/><br/>At our platform, we understand that accessing quality healthcare can be a challenge for many individuals facing medical conditions. Financial barriers often prevent people from receiving the treatments they desperately need. We believe in the power of community and collaboration. Our platform facilitates multi-user crowdfunding, enabling individuals to join forces, pool their resources, and make a greater impact together. Whether you're an individual in need of financial assistance for a medical treatment or a compassionate supporter looking to make a difference, our platform provides a trusted space for you to connect and create positive change.
        </p>
        <div className='stats-container'>
          <Stat img="https://thriveweb.com.au/wp-content/uploads/icon-sky-blue-3.svg" name="ETH raised" stat={`+${5.6}`}/>
          <Stat img="https://thriveweb.com.au/wp-content/uploads/icon-pink-2.svg" name="Successful fundraisers" stat={`+${60}`}/>
          <Stat img="https://thriveweb.com.au/wp-content/uploads/icon-orange-2.svg" name="Generous donors" stat={`+${100}`}/>
        </div>
      </section>

      <section className="why-us-section">
        <div className="section-wrapper">
          <header>
            <img src={logoArt} alt="" />
            <h1>Why Us?</h1>
          </header>
          
          <div className="parallax">
            <span className='text-box text-box-1'>
              Blockchain technology allows for a secure, decentralized network, meaning that no central authority or intermediary is controlling the transactions, reducing the risk of fraud or corruption.
            </span>
            <div className="img-box img-box-1">
              <img src={contractImg} alt="" />
            </div>
            <span className='text-box text-box-2'>
              Real-time tracking of campaign progress and transaction status, providing users with up-to-date and transparent information throughout the crowdfunding process.
            </span>
            <div className="img-box img-box-2">
              <img src={fastImg} alt="" />
            </div>
            <span className='text-box text-box-3'>
              Streamlined fund disbursement, whereby funds are directly transferred to the beneficiary's account, eliminating the need for manual collection as is often required on other platforms.
            </span>
            <div className="img-box img-box-3">
              <img src={transactionImg} alt="" />
            </div>
            <span className='text-box text-box-4'>
              Instant, borderless transactions, which means that donors from all over the world can contribute to a crowdfunding campaign.
            </span>
          </div>
          
        </div>
      </section>

      <section className='campaigns-section medical-campaigns-section'>
      {(campaigns.length===0)?
        <div className="title">
          <span><h1>No active</h1></span>
          <div className="line"></div>
          <span><h1>campaigns</h1></span>
          <div className="line"></div>
        </div>:
        <div className="title">
          <span><h1>Active</h1></span>
          <div className="line"></div>
          <span><h1>campaigns</h1></span>
          <div className="line"></div>
        </div>
      }

        
        
        <div className='cards-container'>
          {campaigns.length > 0
            && campaigns.reverse().slice(0, 5).map((campaign, index) =>
            <CampaignCard
              key={index}
              image={campaign.image}
              avatar={campaign.userProfilePic}
              title={campaign.title}
              userName={campaign.userName}
              beneficiaryName={campaign.beneficiaryName}
              description={campaign.description}
              handleClick={() => handleNavigate(campaign)}
              isResearchCampaign={campaign.isResearchCampaign}
            />
        )}
        </div>
        {campaigns.length>0 && 
          <Link className='view-campaigns-btn' to='/campaigns'><button className="gradient-button">View all campaigns<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="m.819 50.513 8.307 8.238 38.423-38.454-.059 28.89h11.638V.424H10.47l-.14 11.564h28.983L.819 50.513Zm55.31-47.09v42.764V3.424Z" fill="currentColor"></path></svg></button></Link>
        }
      </section>

      <section className='campaigns-section research-campaigns-section'>
      {(researchCampaigns.length===0)?
        <div className="title">
          <span><h1>No active</h1></span>
          <div className="line"></div>
          <span><h1>research</h1></span>
          <div className="line"></div>
          <span><h1>campaigns</h1></span>
          <div className="line"></div>
        </div>:
        <div className="title">
          <span><h1>Active</h1></span>
          <div className="line"></div>
          <span><h1>research</h1></span>
          <div className="line"></div>
          <span><h1>campaigns</h1></span>
          <div className="line"></div>
        </div>
      }
        
        <div className='cards-container'>
          {researchCampaigns.length > 0
            && researchCampaigns.reverse().slice(0, 5).map((campaign, index) =>
            <CampaignCard
              key={index}
              image={campaign.image}
              avatar={campaign.organisationLogo}
              title={campaign.title}
              userName={campaign.organisationName}
              beneficiaryName={campaign.researchLead}
              description={campaign.description}
              handleClick={() => handleNavigate(campaign)}
              isResearchCampaign={campaign.isResearchCampaign}
            />
        )}
        </div>

        {researchCampaigns.length>0 && 
          <Link className='view-campaigns-btn' to='/research/campaigns'><button className="gradient-button">View all research campaigns<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="m.819 50.513 8.307 8.238 38.423-38.454-.059 28.89h11.638V.424H10.47l-.14 11.564h28.983L.819 50.513Zm55.31-47.09v42.764V3.424Z" fill="currentColor"></path></svg></button></Link>
        }
      </section>

    </div>
  )
}

export default Home