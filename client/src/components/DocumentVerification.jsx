import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'

const DocumentVerification = () => {
  const campaignsRef = collection(db, "campaigns")
  const [campaigns, setCampaigns] = useState([])


  useEffect(() => {
    const getCampaigns = async() => {
      const campaignQuery = query(campaignsRef)
      const c = await getDocs(campaignQuery)
      setCampaigns(c.docs.map(chat => [chat.data(), chat.id]))
    }
    getCampaigns()
  }, [])

  const handleVerified = async (campaign) => {
    const res = db.collection('campaigns').doc(campaign[1]).update({verified: true})
    console.log("campaign")
  }

  console.log(campaigns)
  return (
    <>
    <h1>Verification</h1>
    <div className="list">
      {campaigns.map((campaign) => (
        <div className="campaign-row">
          <h2>{campaign[0].name}</h2>
          <h3>{campaign[0].address}</h3>
          <a href={campaign[0].doc}>Documents</a><br/>
          <button onClick={(e)=>handleVerified(campaign)}>Accept</button><br/>
          <button>Reject</button>
        </div>
      ))}
    </div>
    </>
  )
}

export default DocumentVerification