import React from 'react'
import "./campaigncard.scss"
import { Link } from 'react-router-dom'
import { cardBg1 } from '../../assets'


const CampaignCard = (props) => {
  // console.log(props)
  return (
    <div className='campaign-card'>
        <div className="image">
          <img src={props.image} alt="" />
          <div className="cover">
            <button className='contribute-btn' onClick={props.handleClick}>{props.buttonName?props.buttonName: 'Contribute'}</button>
          </div>
        </div>
        <div className='details'>
              <h3>{props.title}</h3>
              <div className='user'>
                <img src={props.avatar} alt="" />
                {/* <MetaMaskAvatar address="0xb01F14d1C9000D453241221EB54648F1C378c970" size={30} /> */}
                <h4>{`${props.userName}`}</h4>
              </div>
            <p><span>{(props.isResearchCampaign)?'Research Lead:':'Beneficiary:'} {props.beneficiaryName}<br/></span>{props.description}</p>
            <button className='contribute-btn' onClick={props.handleClick}>{props.buttonName?props.buttonName: 'Contribute'}</button>
        </div>
    </div>
  )
}

export default CampaignCard