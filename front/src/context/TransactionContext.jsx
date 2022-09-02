import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log({
    provider,
    signer,
    transactionsContract
  });

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((tx) => ({
          addressTo: tx.receiver,
          addressFrom: tx.sender,
          timestamp: new Date(tx.timestamp.toNumber() * 1000).toLocaleString(),
          message: tx.message,
          keyword: tx.keyword,
          amount: parseInt(tx.amount._hex) / 10 ** 18
        }));

        console.log(structuredTransactions);
        setTransactions(structuredTransactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return console.log('Please install to Metamask');
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        //getTransactions
        getAllTransactions();
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('No ethereum object');
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem('transactionCount', currentTransactionCount);
      }
    } catch (error) {
      throw new Error('No ethereum object');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return console.log('Please install to Metamask');

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error.message);
      throw new Error('No ethereum object');
    }
  };

  const sandTransaction = async () => {
    try {
      if (!ethereum) return console.log('Please install to Metamask');
      const { addressTo, amount, keyword, message } = formData;

      const transactionsContract = createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', // 21000
            value: parsedAmount._hex
          }
        ]
      });

      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log('isLoading', transactionHash.hash);
      await transactionHash.wait();
      setIsLoading(false);
      console.log('Success', transactionHash.hash);

      const transactionCount = await transactionsContract.getAllTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error.message);
      throw new Error('No ethereum object');
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sandTransaction
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
