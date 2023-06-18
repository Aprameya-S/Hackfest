import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [beneficiaryDetails, setBeneficiaryDetails] = useState({beneficiaryAddress: "", beneficiaryName: "", beneficiaryProfilePic: "", campaignName: ""})
  
  //setting address of campaign owner from /campaign-details:campaign_name page
  const getBeneficiaryDetails = (details) => {
    setBeneficiaryDetails({beneficiaryAddress: details.beneficiaryAddress, beneficiaryName: details.beneficiaryName, beneficiaryProfilePic: details.beneficiaryProfilePic, campaignName: details.campaignName})
  }
  
  //gets all transactions done on the site
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();
        //console.log(availableTransactions)

        const structuredTransactions = availableTransactions.map((transaction) => ({
          donorAddress: transaction.donorAddress,
          donorName: transaction.donorName,
          donorProfilePic: transaction.donorProfilePic,
          beneficiaryAddress: transaction.beneficiaryAddress,
          beneficiaryName: transaction.beneficiaryName,
          beneficiaryProfilePic: transaction.beneficiaryProfilePic,
          campaignName: transaction.campaignName,
          amount: parseInt(transaction.amount._hex) / (10 ** 18),
          message: transaction.message,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        }));

        // console.log(structuredTransactions);

        setTransactions(structuredTransactions);
        return structuredTransactions;
      } else {
        // toast("Connect to Metamask to view all info.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      // if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        // console.log("No accounts found");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  //verify wallet
  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      // console.log(error);
      // throw new Error("No ethereum object");
    }
  };

  //connect metamask
  const connectWallet = async () => {
    try {
      if (!ethereum) return toast("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      if(error.code === 4100){
        toast.error("Contract call failure: This action requires a connected wallet to sign the transaction. Please connect your wallet and try again. ", error)      
      }
      else if(error.code === 4001){
        toast.error("Connection was terminated. Please try again")
      }
      else {
        toast.error(error.message);
      }
      
    }
  };

  const sendTransaction = async (formData) => {
    try {
      
      if (ethereum) {

        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(formData.amount);

        // console.log(formData)

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: formData.beneficiaryAddress,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(formData.beneficiaryAddress, formData.donorName, formData.donorProfilePic, formData.beneficiaryName, formData.beneficiaryProfilePic, formData.campaignName, parsedAmount, formData.message);

        setIsLoading(true);
        // console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        // console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
        toast.success("You have successfully donated to " + formData.beneficiaryName);

      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      if(error.code === 4100){
        toast.error("Please connect your wallet before donating.")
      }
      else if(error.code === 4001){
        toast.error("Transaction was terminated. Please try again")
      }
      else {             
          if(!error.includes("name")) {
              toast.error(error.message);
          }
      }
      throw(error)
    }
  };



  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        // handleChange,
        // formData,
        getBeneficiaryDetails,
        getAllTransactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
