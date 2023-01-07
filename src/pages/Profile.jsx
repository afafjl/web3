import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'
import {useRef} from 'react';
const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const ref = useRef(null);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
    ref.current?.scrollIntoView({behavior: 'smooth'});
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div ref = {ref} className="p-3 mx-5 xl:mx-24 mt-2 min-h-screen">
    <DisplayCampaigns 
      title="Your Charities"
      isLoading={isLoading}
      campaigns={campaigns}
    /></div>
  )
}

export default Profile