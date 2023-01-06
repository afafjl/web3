import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { DisplayCampaigns, Banner } from '../components';
import { useStateContext } from '../context'
import { forwardRef } from "react";
import { calculateBarPercentage, daysLeft } from '../utils';
const Home = forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [campaigns1, setCampaigns1] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const navigate = useNavigate();

  const handleNavigate = (type) => {
    navigate(`/type/${type.replace(/ /g,"_")}`, { state: type })
  }
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    var temp=[];
    var temp1=[];
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
      if(daysLeft(data[i].deadline)>0){
        temp.push(data[i]);
      }else temp1.push(data[i]);
    }
    setCampaigns(temp);
    setCampaigns1(temp1);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
<div>

    <Banner/>
    <div ref={ref} className='lg:px-24 px-4 py-10'>
  <DisplayCampaigns 
      title="OnGoing Charities"
      isLoading={isLoading}
      campaigns={campaigns}
    /></div>
    <div className="container1" >

<div onClick={() => { handleNavigate("Education Charity") }} className="gallery-container ww-3 hh-2">
  <div className="gallery-item">
    <div className="image">
      <img src="https://wellbeingmagazine.s3.eu-west-1.amazonaws.com/wp-content/uploads/2019/11/Unicef-%E2%80%93-A-Vital-Education-Charity-in-Thailand.jpg" alt="nature"/>
    </div>
    <div className="text">Education Charity</div>
  </div>
</div>

<div onClick={() => { handleNavigate("Animal Charity") }} className="gallery-container ww-2 hh-3">
  <div className="gallery-item">
    <div className="image">
      <img src="https://media.4-paws.org/e/e/3/2/ee32b1aeb912bee1c71f04136cf7e7fd1038bc9f/VIER%20PFOTEN_2017-08-13_048-3000x2001-960x640.jpg" alt="people"/>
    </div>
    <div className="text">Animal Charity</div>
  </div>
</div>

<div onClick={() => { handleNavigate("Other") }} className="gallery-container hh-5">
  <div className="gallery-item">
    <div className="image">
      <img src="https://vcdn-english.vnecdn.net/2017/11/30/Photo-2-2721-1512032901.jpg" alt="sport"/>
    </div>
    <div className="text">Other</div>
  </div>
</div>

<div onClick={() => { handleNavigate("Human Services") }} className="gallery-container ww-2 hh-3">
  <div className="gallery-item">
    <div className="image">
      <img src="https://miro.medium.com/max/1000/0*lzyNu8ztv9-aJSyn.jpg" alt="fitness"/>
    </div>
    <div className="text">Human Services</div>
  </div>
</div>

<div onClick={() => { handleNavigate("Environmental Charity") }} className="gallery-container ww-1 hh-3">
  <div className="gallery-item">
    <div className="image">
      <img src="https://images.squarespace-cdn.com/content/v1/5bd3fe687eb88c4d6f4376a3/1556826088287-3NHYEP1T2QE143HA5MJE/environmental+nonprofits+organizations+%7C+Green+Dreamer+Podcast+on+Sustainability+and+Regeneration" alt="food"/>
    </div>
    <div className="text">Environmental Charity</div>
  </div>
</div>

<div onClick={() => { handleNavigate("Health Charity") }} className="gallery-container ww-2 hh-2">
  <div className="gallery-item">
    <div className="image">
      <img src="https://media.gosh.org/images/f6179629-8af84edb-aa363e59-68d42f63-22f11241-.width-1000.jpg" alt="travel"/>
    </div>
    <div className="text">Health Charity</div>
  </div>
</div>



</div>
<div  className='lg:px-24 px-4 py-10'>
  <DisplayCampaigns 
      title="Ended Charities but still donatable"
      isLoading={isLoading}
      campaigns={campaigns1}
    /></div>

</div>


  )
})

export default Home