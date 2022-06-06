import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const [currentAccount, setCurrentAccount] = useState('');

  const checkIfWalletIsConnected = async () => {
    /*
    * First make sure we have access to window.ethereum
    */
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have a Metamask wallet");
      } else {
        console.log("We have the Ethereum object", ethereum);
      }
      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = ethereum.request({method: 'eth_accounts'});
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>
        <div className="bio">
          I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
