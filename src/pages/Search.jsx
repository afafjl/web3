import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { DisplayCampaigns, Banner } from '../components';
import { useStateContext } from '../context'

const Search = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [state, setState] = useState('');
    const { address, contract, searchCampaigns, getCampaignsbyType } = useStateContext();
    const location = useLocation()

    const fetchCampaigns = async (state1) => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
      setIsLoading(true);

      const data = await searchCampaigns(state1);
    // const data = await getCampaignsbyId(1);
      setCampaigns(data);
      setIsLoading(false);
    }

    useEffect(() => {
      var str=window.location.href;
      var n = str.lastIndexOf('/');
      setState( str.substring(n + 1).replace(/_/g," "));
      
      if(contract) fetchCampaigns(str.substring(n + 1).replace(/_/g," "));
    }, [address, contract,location]);


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