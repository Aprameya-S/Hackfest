// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VitalFund {
    struct Campaign {
        address owner;
        string userName;
        string userProfilePic;
        string beneficiaryName;
        string title;
        string image;
        string description;
        string documentUrl;
        uint256 target;
        uint256 deadline;
        bool isResearchCampaign;
    }

    struct ResearchCampaign {
        address owner;
        string organisationName;
        string organisationLogo;
        string researchLead;
        string title;
        string image;
        string description;
        string documentUrl;
        uint256 target;
        uint256 deadline;
        bool isResearchCampaign;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => ResearchCampaign) public researchCampaigns;

    uint256 public numberOfCampaigns = 0;
    uint256 public numberOfResearchCampaigns = 0;

    function createCampaign(address _owner,string memory _userName, string memory _userProfilePic, string memory _beneficiaryName, string memory _title, string memory _image, string memory _description, string memory _documentUrl, uint256 _target, uint256 _deadline) public returns (uint256) {
        //equivalent of 'new' to create a variable
        //here we create an object of type Campaign
        Campaign storage campaign = campaigns[numberOfCampaigns];

        //require is like try and catch
        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.userName = _userName;
        campaign.userProfilePic = _userProfilePic;
        campaign.beneficiaryName = _beneficiaryName;
        campaign.title = _title;
        campaign.image = _image;
        campaign.description = _description;
        campaign.documentUrl = _documentUrl;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.isResearchCampaign = false;
        
        numberOfCampaigns++;

        return numberOfCampaigns-1;
    }

    function getCampaigns() public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function createResearchCampaign(address _owner, string memory _organisationName, string memory _organisationLogo, string memory _researchLead, string memory _title, string memory _image, string memory _description, string memory _documentUrl, uint256 _target, uint256 _deadline) public returns (uint256) {
        //equivalent of 'new' to create a variable
        //here we create an object of type Campaign
        ResearchCampaign storage researchCampaign = researchCampaigns[numberOfResearchCampaigns];

        //require is like try and catch
        require(researchCampaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        researchCampaign.owner = _owner;
        researchCampaign.organisationName = _organisationName;
        researchCampaign.organisationLogo = _organisationLogo;
        researchCampaign.researchLead = _researchLead;
        researchCampaign.title = _title;
        researchCampaign.image = _image;
        researchCampaign.description = _description;
        researchCampaign.documentUrl = _documentUrl;
        researchCampaign.target = _target;
        researchCampaign.deadline = _deadline;
        researchCampaign.isResearchCampaign = true;
        
        numberOfResearchCampaigns++;

        return numberOfResearchCampaigns-1;
    }

    function getResearchCampaigns() public view returns(ResearchCampaign[] memory){
        ResearchCampaign[] memory allResearchCampaigns = new ResearchCampaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfResearchCampaigns; i++) {
            ResearchCampaign storage item = researchCampaigns[i];
            allResearchCampaigns[i] = item;
        }

        return allResearchCampaigns;
    }
}