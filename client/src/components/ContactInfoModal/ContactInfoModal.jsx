import React, { useState } from 'react'
import "../../index.scss"
import { db } from '../../Firebase'
import {
    collection,
    addDoc,
  } from "firebase/firestore";
  import { toast } from 'react-toastify';
const ContactInfoModal = ({isOpen, onClose}) => {
    const [number, setNumber] = useState()
    const [method, setMethod] = useState("Whatsapp")
    
    const submitContact = async(e) => {
        e.preventDefault()
        try{

            const contactRef = collection(db, "contact")
            await addDoc(contactRef, {number, method, name: localStorage.getItem("googleDisplayName")})
            setNumber('')
            setMethod('')
            onClose()
            toast.success("Successfully sent. We will contact you soon")
        }catch(e){
            toast.error("Could not send the message, please try again")
        }
    }



  return (
    <div className={`${isOpen ? "" : "hidden"} modal w-full  md:w-1/3 rounded-md outline z-[200] fixed top-1/2`}>
        <div className="flex justify-between items-center border-b px-5 py-2">
            <h1 className='font-medium'>Contact us</h1>
            <button onClick={onClose} className='btn-grad p-2 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <form action="" onSubmit={submitContact} className='px-5 py-5'>
            <div className="flex flex-col">
                <label htmlFor="number" className=' text-black  '>Your number*
                </label>
                <input required value={number} onChange={(e) => setNumber(e.target.value)} id="number" name="number" type="tel" className='outline outline-[1px] focus:outline-[2px] rounded-md text-md text-md text-black px-2 py-4' />
            </div>
            <div className="mt-5">
                <h1 htmlFor="" className='text-black'>Preference for contact*</h1>
                <div className="flex items-center justify-start ml-5 ">
                    <input type="radio" id="whatsapp" name="contact" value="whatsapp" checked={method ==="Whatsapp"} className=' w-min' onClick={() => setMethod("Whatsapp")}/>
                    <label for="whatsapp" className='ml-1 text-black '>Whatsapp
                    </label>
                </div>

                <div className='flex items-center justify-start ml-5 '>
                    <input type="radio" id="call" name="contact" value="call" onClick={() => setMethod("Call")} className='w-min' checked={method ==="Call"}/>
                    <label for="call" className='ml-1 text-black'>Call</label>
                </div>
            </div>
            <div className="flex mt-3">
                <button type="submit" className='gradient-button '>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default ContactInfoModal