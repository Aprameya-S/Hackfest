import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Navbar } from './components'
import { Home, Campaigns, CampaignDetails, CreateCampaign} from './pages'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Admin from './pages/AdminPage/Admin'
import FloatingChat from './components/FloatingChat/FloatingChat';
import ContactInfoModal from './components/ContactInfoModal/ContactInfoModal';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="App">
        <Navbar />
        <FloatingChat />
        <div id="pages">
          <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/campaigns' element={<Campaigns />}/>
          <Route path='/create-campaign' element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />}/>
          <Route path='/admin' element={
            <Protected>
              <Admin/>
            </Protected>
          } />
        </Routes>
        </div>
        <Footer />
      </div>
    </>
    
  );
}

const Protected = ({children}) => { 
  const valids = ["joshuatauro45@gmail.com", "aprameyashankar@gmail.com"]
  if(!valids.includes(localStorage.getItem("userEmail"))) return <Navigate to="/" replace />
  return children;
}

export default App;
