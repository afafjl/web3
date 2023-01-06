import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { DisplayCampaigns, Banner } from '../components';
import { useStateContext } from '../context'

const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
  
    const { address, contract,getCampaignsbyId, getCampaignsbyType } = useStateContext();
    var { state } = useLocation();
    const fetchCampaigns = async () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
      setIsLoading(true);
      const data = await getCampaignsbyType(state);
    // const data = await getCampaignsbyId(1);

      setCampaigns(data);
      setIsLoading(false);

    }
  
    useEffect(() => {
      if(contract) fetchCampaigns();
    }, [address, contract]);

    console.log(campaigns)
  return (
    <div className="p-3 mx-5 xl:mx-24 mt-2 min-h-screen">  
        <DisplayCampaigns 
            title={state}
            isLoading={isLoading}
            campaigns={campaigns}
        />
  </div>
  )
}

export default Search