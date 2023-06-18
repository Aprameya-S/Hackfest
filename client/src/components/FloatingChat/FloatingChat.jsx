import React, { useState, useEffect, useContext, useRef } from 'react'
import { db } from '../../Firebase'
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
  } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router';
import '../../index.scss'
import ContactInfoModal from '../ContactInfoModal/ContactInfoModal';
import { toast } from 'react-toastify';
const FloatingChat = () => {
    const location = useLocation()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [isContactOpen, setIsContactOpen] = useState(false)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const {isSignedIn} = useContext(AuthContext)

    const scrollRef = useRef()

    useEffect(() => {
        let messagesRef;
        if(localStorage.userID){
            messagesRef = collection(db, "users", localStorage.getItem("userID"), "messages");
        }
        if(localStorage.getItem("userEmail")){
            const queryMessages = query(
                messagesRef,
                orderBy("createdAt")
            );
            const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
                let messages = [];
                snapshot.forEach((doc) => {
                    messages.push({ ...doc.data(), id: doc.id });
                });
                setMessages(messages);
            scrollRef.current.scrollIntoView({behavior: "smooth"})

            });
            return () => unsubscribe();
        }
    
      }, [isSignedIn]);

    const handleMessageSubmit = async(e) => {
        e.preventDefault()
        if(localStorage.getItem("isSignedIn") === "false") return toast.error("Please signin to be able to chat")
        else if(newMessage === "") return toast.error("Please enter a valid message")
        else{
            try{

                setNewMessage("")
                const messagesRef = collection(db, "users", localStorage.getItem("userID"), "messages");

            await addDoc(messagesRef,{
                username: localStorage.getItem("googleDisplayName"),
                profileImage: localStorage.getItem("googleProfilePic"),
                message: newMessage,
                email: localStorage.getItem("userEmail"),
                createdAt: serverTimestamp()
            })
            scrollRef.current.scrollIntoView({behavior: "smooth"})
            } catch(err){
                console.log(err)
            }

        }        
    }
    const openChat = () => {
        if(localStorage.getItem("isSignedIn") === "true"){
            setIsChatOpen(true)
        }else{
            toast.error("Please sign in to be able to chat")
        }
    }
  return (
    <div className={` ${location.pathname.split("/")[1] === "admin" ? "hidden" : ""}`}>
    <ContactInfoModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    <button onClick={openChat} className='border z-50 bg-white border-cta h-12 font-medium fixed flex items-center justify-center bottom-2 right-[0px] md:right-[20px] scale-75 rounded-full'>
        <span className='btn-grad h-full aspect-square rounded-full flex items-center text-white justify-center text-2xl'>+</span>
        <h1 className='mx-2 text-cta uppercase font-semibold px-2'>Talk to us</h1>
    </button>
    <div className={`${isChatOpen ? "" : "hidden"} fixed border-2 border-cta bottom-2 xs:left-0 md:left-ful0l right-0 md:w-1/4  lg:right-[20px] z-50 h-3/4 rounded-[15px] bg-white overflow-hidden`}>
        <div className="h-full relative  flex flex-col justify-end">
            <div className="flex z-50 justify-between px-2 py-2 items-center border-b-2">
                <button onClick={() => setIsContactOpen(true)} className='gradient-button text-xs'>Contact Us</button>
                <button onClick={() => {setIsChatOpen(false)
                                        setIsContactOpen(false)}} className='btn-grad p-2 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="px-2 chatbox">
                {
                    messages.map(({message, username, profileImage, isAdmin}) => <MessageComponent message={message}name={username} img={profileImage} isAdmin={isAdmin} />)
                }
                <div ref={scrollRef}></div>
            </div>
            <form onSubmit={handleMessageSubmit} className=' flex w-full'>
                <input value={newMessage}
                        placeholder='Feel free to ask anything :)'
                        onChange={(e) => setNewMessage(e.target.value)} type="text" className='flex flex-1 outline-none px-3 py-2 text-sm border-t-2 border-r-2 border-cta' />
                <button className='btn-grad-2 px-3 py-2 text-xs font-medium'>Send</button>
            </form>
        </div>
    </div>
    </div>
  )
}

const MessageComponent = ({message, img, isAdmin}) => {
    return(
        <div className={`flex mb-3 ${!isAdmin ? " flex-row-reverse" : ""}`}>
            <img src={img} className='h-7 rounded-full' alt="" />
            <div className={` ${!isAdmin ? "bg-blue-400 mr-1 text-white" : "bg-[#EAEAEA] text-black ml-1"} px-2 py-3 flex items-center  rounded-md`}>
                <p className='font-medium text-xs'>{message}</p>
            </div>
        </div>
    )
  }

export default FloatingChat