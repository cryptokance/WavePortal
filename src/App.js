import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './utils/WavePortal.json';

/**
 * Local Imports
 */
import { Button } from './components';
import './App.css';

const App = () => {
	const contractAddress = '0x4E6E999D5302B19347180Bd8E3613fF6b655bA7b';
	const contractABI = abi.abi;
	const [
		currentAccount,
		setCurrentAccount
	] = useState('');

	const checkIfWalletIsConnected = async () => {
		/*
    * First make sure we have access to window.ethereum
    */
		try {
			const { ethereum } = window;
			if (!ethereum) {
				console.log('Make sure you have a Metamask wallet');
			} else {
				console.log('We have the Ethereum object', ethereum);
			}
			/*
      * Check if we're authorized to access the user's wallet
      */
			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length !== 0) {
				const account = accounts[0];
				console.log('Founded an authorized account', account);
				setCurrentAccount(account);
			} else {
				console.log('No authorized account');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	const wave = async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
				let count = await wavePortalContract.getTotalWaves();
				console.log('Retrieved total wave count...', count.toNumber());

				/*
        * Execute the actual wave from your smart contract
        */

				const waveTxn = await wavePortalContract.wave();
				console.log('Mining...', waveTxn.hash);
				await waveTxn.wait();
				console.log('Mined -- ', waveTxn.hash);
				count = await wavePortalContract.getTotalWaves();
				console.log('Retrieved total wave count...', count.toNumber());
			} else {
				console.log("Ethereum objecty dosen't exist");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert('Get Metamask');
				return;
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			console.log('Connected', accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='mainContainer'>
			<div className='dataContainer'>
				<div className='header'>👋 Hey there!</div>
				<div className='bio'>
					I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum
					wallet and wave at me!
				</div>
				<Button classNames='primaryButton' onClick={wave}>
					Wave at Me
				</Button>
				{!currentAccount && (
					<Button classNames='primaryButton' onClick={connectWallet}>
						Connect Wallet
					</Button>
				)}
			</div>
		</div>
	);
};

export default App;
