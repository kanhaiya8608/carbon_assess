import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Toaster, toast } from 'sonner';

function WalletConnector() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function fetchBalance() {
      if (web3 && accounts.length > 0) {
        try {
          const bal = await web3.eth.getBalance(accounts[0]);
          setBalance(web3.utils.fromWei(bal, 'ether'));
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    }

    fetchBalance();
  }, [web3, accounts]);

  async function handleConnect() {
    if (!web3) {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accs = await web3Instance.eth.getAccounts();
          setAccounts(accs);
          setConnected(true);
          toast.success('Wallet connected successfully.', {
            position: 'top-right',
            autoClose: 10000
          });
        } catch (error) {
          toast.error(`Error connecting wallet: ${error.message}`, {
            position: 'top-right',
            autoClose: 10000
          });
        }
      } else {
        toast.error('MetaMask not detected. Please install MetaMask extension.', {
          position: 'top-right',
          autoClose: 10000
        });
      }
    }
  }

  return (
    <div className='flex flex-col space-y-4 md:space-x-6 md:flex-row items-center '>
      <div>
        {connected && <p>Connected Account:  {accounts[0]} ETH</p>}
        {connected && <p>Balance: {balance} ETH</p>}
      </div>
     
        <button 
          className="bg-green-500 p-4 text-md hover:bg-green-400 font-bold rounded-md"
          onClick={handleConnect}
        >
          Connect Wallet
        </button>

     
      <Toaster closeButton position="top-right" />
    </div>
  );
}

export default WalletConnector;
