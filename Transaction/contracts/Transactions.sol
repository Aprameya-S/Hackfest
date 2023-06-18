// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address reciever, string donorName, string donorProfilePic, string beneficiaryName, string beneficiaryProfilePic, string campaignName, uint amount, string message, uint256 timestamp);

    struct TransferStruct {
        address donorAddress;
        address beneficiaryAddress;
        string donorName;
        string donorProfilePic;
        string beneficiaryName;
        string beneficiaryProfilePic;
        string campaignName;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable reciever, string memory donorName, string memory donorProfilePic, string memory beneficiaryName, string memory beneficiaryProfilePic, string memory campaignName, uint amount, string memory message) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, reciever, donorName, donorProfilePic, beneficiaryName, beneficiaryProfilePic, campaignName, amount, message, block.timestamp));

        emit Transfer(msg.sender, reciever, donorName, donorProfilePic, beneficiaryName, beneficiaryProfilePic, campaignName, amount, message, block.timestamp);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}