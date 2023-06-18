import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase'
import { DocumentVerification } from '../../components'

const Admin = () => {
  const usersRef = collection(db, "users")
  const [chatsArray, setChatsArray] = useState([])
  const [currentUserID, setCurrentUserID] = useState()
  const [reply, setReply] = useState('')
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const getChats = async() => {
      const chatsQuery = query(usersRef)
      const chats = await getDocs(chatsQuery)
      setChatsArray(chats.docs.map(chat => [chat.data(), chat.id]))
    }
    getChats()
  }, [])

  useEffect(() => {
    const getChatMessages = async() => {
      console.log("fetching messages")
      const userChatsRef = collection(db, "users", currentUserID, "messages")
      const queryMessages = query(userChatsRef, orderBy("createdAt"))
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
          let message = [];
          snapshot.forEach((doc) => {
              message.push({ ...doc.data(), id: doc.id });
          });
          setMessages(message);
        })
        return () => unsubscribe()
      }
      currentUserID && getChatMessages()
  }, [currentUserID])

  const handleOpenChat = uid => {
    console.log(uid)
    setCurrentUserID(uid)
  }

  const sendReply = async(e) => {
    e.preventDefault()
    if(reply.length === 0) return alert("Please type a message to send")
    const chatRef = collection(db, "users", currentUserID, "messages")
    setReply("")
    await addDoc(chatRef, {
      username: localStorage.getItem("googleDisplayName"),
      profileImage: localStorage.getItem("googleProfilePic"),
      email: localStorage.getItem("userEmail"),
      message: reply,
      isAdmin: true,
      createdAt: serverTimestamp()
    })
  }

  return (
    <>
    <div className='mx-3 mt-5  border-[3px] rounded-md border-cta grid grid-cols-10 chat overflow-hidden'>
      <div className="bg-[#EEF0F2] col-span-2 w-full h-full">
        <div className=" ">
          <h1 className='flex px-3 font-medium uppercase border-b-2 py-3'>Recent messages</h1>
          {
            chatsArray.map(chat => <Chat email={chat[0].email} name={chat[0].username} id={chat[1]} img={chat[0].profileImage} handleOpenChat={handleOpenChat}/>)
          }
        </div>
      </div>
      <div className="col-span-8">
        {
          !currentUserID ? (
            <div className='grid place-items-center h-full'>
              <h1 className='text-4xl text-gray-500 font-medium'>Select a chat to continue</h1>
            </div>
          ) : (
            <div className="flex flex-col justify-end h-full px-3">
              <div className="chatbox">
              {
                messages.map(({message, username, profileImage, isAdmin}) => <MessageComponent message={message}name={username} img={profileImage} isAdmin={isAdmin} />)
              }
              </div>
              <form onSubmit={sendReply} className='flex justify-between mb-2'>
                <input value={reply} onChange={e => setReply(e.target.value)} type="text" className='outline outline-2 mr-2 rounded-md outline-cta py-3 px-2 font-medium flex-1' />
                <button type="submit" className='btn-grad px-4 rounded-md text-white font-medium '>Send</button>
              </form>
            </div>
          )
        }
      </div>
    </div>
    <div className="mx-3">
      <DocumentVerification />
    </div>
    </>
  )
}

const Chat = ({name, img, id, email, handleOpenChat}) => {
  return(
    <button onClick={() => handleOpenChat(id)} className="flex  border-b2 px-4 py-3">
      <img src={img} alt="" className='h-10 rounded-full' /> 
      <div className="ml-2">
        <h1 className='font-medium text-lg text-left'>{name}</h1>
        <p className='font-medium text-xs text-gray-500'>{email}</p>
      </div>
    </button>
  )
}

const MessageComponent = ({message, img, isAdmin}) => {
  return(
      <div className={`flex mb-3 ${isAdmin ? " flex-row-reverse" : ""}`}>
          <img src={img} className='h-7 rounded-full' alt="" />
          <div className={` ${isAdmin ? "bg-blue-400 mr-1 text-white" : "bg-[#EAEAEA] text-black ml-1"} px-2 py-3 flex items-center  rounded-md`}>
              <p className='font-medium text-sm'>{message}</p>
          </div>
      </div>
  )
}

export default Admin