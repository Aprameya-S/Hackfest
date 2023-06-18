import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import { doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DocumentVerification = () => {
  const campaignsRef = collection(db, "campaigns")
  const [campaigns, setCampaigns] = useState([])


  useEffect(() => {
    const getCampaigns = async() => {
      const campaignQuery = query(campaignsRef, where("checked", "!=", true))
      const c = await getDocs(campaignQuery)
      setCampaigns(c.docs.map(chat => [chat.data(), chat.id]))
    }
    getCampaigns()
  }, [])

  const handleVerified = async (campaign) => {
    const cRef = doc(db, "campaigns", campaign[1]);

    await updateDoc(cRef, {
      verified: true,
      checked: true
    });
    toast.success("Campaign was verified.")
    setCampaigns(prev => prev.filter(p => p[1] !== campaign[1]))
  }
  const handleRejection = async (campaign) => {
    const cRef = doc(db, "campaigns", campaign[1]);

    await updateDoc(cRef, {
      verified: false,
      checked: true
    });
    toast.success("Campaign was rejected.")
    setCampaigns(prev => prev.filter(p => p[1] !== campaign[1]))

  }

  console.log(campaigns)
  return (
    <>
    <h1 className='text-2xl font-medium mt-10 mb-2'>Verification</h1>
    <div className="">
      {campaigns?.map((campaign) => (
        <div className="border-b border-purple-500 px-2 py-3 flex justify-between place-items-end">
          <div className="">
            <h2 className='text-2xl font-semibold'>{campaign[0].name}</h2>
            <h3 className='text-sm font-medium break-words'>{campaign[0].address}</h3>
            <a href={campaign[0].doc} className='text-purple-700 underline underline-offset-4'>Verification Documents</a><br/>
          </div>
          <div className="flex mt-4 gap-1">
            <button className='h-8 w-8 bg-green-200 border rounded-full border-green-800 flex items-center justify-center' onClick={(e)=>handleVerified(campaign)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
  
            </button><br/>
            <button className='h-8 w-8 bg-red-200 border rounded-full border-red-800 flex items-center justify-center' onClick={(e)=>handleRejection(campaign)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default DocumentVerification