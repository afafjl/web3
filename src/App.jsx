import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar,  Footer } from './components';
import { CampaignDetails,Dumb, CreateCampaign, Home, Profile,Search, AllCharities } from './pages';
import {useRef} from 'react';

const App = () => {

  const resultRef = useRef(null);
  return (
    <div className="bg-[#13131a] ">
      <div className="relative sm:-8 px-4 pt-5 bg-[#13131a] flex flex-row border-b-[0.5px] border-b-[#3a3a43]">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar resultRef={resultRef}/>      
        </div>      
      </div>


      {/* <div ref={ref}  className="min-h-screen pt-10 pb-10 md:mx-24 mx-2">  */}
        <Routes>
          <Route path="/" element={<Home ref={resultRef}/>} /> 
          <Route path="/type/:p" element={<Search/>} /> 
          <Route path="/q/:p" element={<Search/>} /> 
          <Route path="/profile" element={<Profile/>}  />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:p/:id" element={<Dumb />} />
          <Route path="/all-charities" element={<AllCharities />} />
        </Routes>

        {/* </div> */}
        <Footer/>
    </div>
  )
}

export default App