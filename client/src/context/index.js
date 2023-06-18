import React, { useContext, createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

  //const { contract } = useContract('0x078B794A9cE38455c5747a2BE53408e8466137c3'); //Thirdweb contract address
  const { contract } = useContract('0x6E31fcfdFb75a33CEc614b1cD63257EB73E6Ab8f'); //Thirdweb contract address

  
  //Renaming createCampaign function
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  
  const { mutateAsync: createResearchCampaign } = useContractWrite(contract, 'createResearchCampaign');

  const address = useAddress(); //get address from metamask
  const connect = useMetamask(); //connect to metamask

  const publishCampaign = async (form) => {
    try {
      if(!address){
        throw({message: "Connect to Metamask wallet to create a campaign."})
      }
      const data = await createCampaign([
        address, // owner
        form.userName,
        form.userProfilePic,
        form.beneficiaryName,
        form.title, // title of campaign
        form.image,
        form.description, // description
        form.documentUrl, 
        form.target,
        new Date(form.deadline).getTime() // deadline,
      ])
      toast.success("Campaign created successfully!")
      // window.location = 'https://vitalfund.netlify.app/campaigns';

    } catch (error) {
      console.log(error)
      if(error.code === 4100){
        toast.error("Contract call failure: This action requires a connected wallet to sign the transaction. Please connect your wallet and try again. ", error)      
      }
      else if(error.code === 4001){
        toast.error("Transaction was terminated. Please try again")
      }
      else {
        toast.error("Error in transaction. Please try again.");
      }
    }
  }
  //gets all campaigns to display on the /campaigns page
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');
    //console.log(campaigns)

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      userName: campaign.userName,
      userProfilePic: campaign.userProfilePic,
      beneficiaryName: campaign.beneficiaryName,
      title: campaign.title,
      image: campaign.image,
      description: campaign.description,
      documentUrl: campaign.documentUrl,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      isResearchCampaign: campaign.isResearchCampaign,
      pId: i
    }));

    return parsedCampaings;
  }
  //gets active campaigns of current user to display on /profile page
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  
  const publishResearchCampaign = async (form) => {
    try {
      if(!address){
        throw({message: "Connect to Metamask wallet to create a campaign."})
      }
      const data = await createResearchCampaign([
        address, // owner
        form.organisationName,
        form.organisationLogo,
        form.researchLead,
        form.title, // title of campaign
        form.image,
        form.description, // description
        form.documentUrl, 
        form.target,
        new Date(form.deadline).getTime() // deadline,
      ])
      toast.success("Campaign created successfully!")
      // window.location = 'https://vitalfund.netlify.app/campaigns';

    } catch (error) {
      if(error.code === 4100){
        toast.error("Contract call failure: This action requires a connected wallet to sign the transaction. Please connect your wallet and try again. ", error)      
      }
      else if(error.code === 4001){
        toast.error("Transaction was terminated. Please try again")
      }
      else {
        toast.error(error.message);
      }
    }
  }
  const getResearchCampaigns = async () => {
    const campaigns = await contract.call('getResearchCampaigns');
    //console.log(campaigns)

    const parsedResearchCampaings = campaigns.filter((campaign) => campaign.isResearchCampaign === true).map((campaign, i) => ({
      owner: campaign.owner,
      organisationName: campaign.organisationName,
      organisationLogo: campaign.organisationLogo,
      researchLead: campaign.researchLead,
      title: campaign.title,
      image: campaign.image,
      description: campaign.description,
      documentUrl: campaign.documentUrl,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      isResearchCampaign: campaign.isResearchCampaign,
      pId: i
    }));

    return parsedResearchCampaings;
  }
  const getUserResearchCampaigns = async () => {
    const allCampaigns = await getResearchCampaigns();

    const filteredResearchCampaigns = allCampaigns.filter((campaign) => campaign.owner === address).filter((campaign) => campaign.isResearchCampaign === true);

    return filteredResearchCampaigns;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        createResearchCampaign: publishResearchCampaign,
        getResearchCampaigns,
        getUserResearchCampaigns
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);