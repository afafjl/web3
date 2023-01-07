import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // const { contract } = useContract('0x351F9af00D86F6720fa1EF91BC7f796E54bdd09a');
    // const { contract } = useContract('0xf59A1f8251864e1c5a6bD64020e3569be27e6AA9');
    const { contract } = useContract('0xAEd45568a617C5f1Dc77ea498aB64CC868Ea7FeC');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    if (form.category ==null || form.category==""){form.category="Education Charity"}
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
        form.category
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      category: campaign.category,
      pId: i
    }));
    return parsedCampaings;
  }
  const getCampaignsbyId = async (id) => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      category: campaign.category,
      pId: i
    }));
    var temp=[];
    var arrayLength = parsedCampaings.length;
    for (var i = 0; i < arrayLength; i++) {
      if(i==id){
        temp.push(parsedCampaings[i]);
      }
    }
    return temp;
  }
  const getCampaignsbyType = async (type) => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      category: campaign.category,
      pId: i
    }));
    var temp=[];
    var arrayLength = parsedCampaings.length;
    for (var i = 0; i < arrayLength; i++) {
      if(parsedCampaings[i].category==type){
        temp.push(parsedCampaings[i]);
      }
    }
    return temp;
    
  }

  const searchCampaigns = async (input) => {
    if (input==null)input ="";
    var q= input.toLowerCase();
    const campaigns = await contract.call('getCampaigns');
    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      category: campaign.category,
      pId: i
    }));
    var temp=[];
    var arrayLength = parsedCampaings.length;
    for (var i = 0; i < arrayLength; i++) {

      if(parsedCampaings[i].title.toLowerCase().search(q)>=0 ){
        temp.push(parsedCampaings[i]);
      }else if(parsedCampaings[i].description.toLowerCase().search(q)>=0){
        temp.push(parsedCampaings[i]);
      }else if(parsedCampaings[i].category.toLowerCase().search(q)>=0 && parsedCampaings[i].category != null ){
        temp.push(parsedCampaings[i]);
      }
    }
    return temp;
    
  }


  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getCampaignsbyType,
        getCampaignsbyId,
        getUserCampaigns,
        searchCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);