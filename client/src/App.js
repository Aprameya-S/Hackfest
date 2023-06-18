import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Navbar } from './components'
import { Home, Campaigns, CampaignDetails, CreateCampaign} from './pages'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <div id="pages">
          <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/campaigns' element={<Campaigns />}/>
          <Route path='/create-campaign' element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />}/>
        </Routes>
        </div>
        <Footer />
      </div>
    </>
    
  );
}


export default App;
