import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

/**
 * Local Imports
 */
import { Button } from './components';
import abi from './utils/WavePortal.json';
import './App.css';

const App = () => {
	const contractAddress = '0x56d36d11CaF188539DA867ac70F1cD9099d44608';
	const contractABI = abi.abi;
	const [
		currentAccount,
		setCurrentAccount
	] = useState('');
	/**
	 * All state property to store all waves
	 */
	const [
		allWaves,
		setAllWaves
	] = useState([]);

	const getAllWaves = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
				const waves = await wavePortalContract.getAllWaves();
				let cleanedWaves = [];

				waves.forEach((wave) => {
					cleanedWaves.push({
						address   : wave.waver,
						timestamp : new Date(wave.timestamp * 1000),
						message   : wave.message
					});
				});
				console.log(waves);
				setAllWaves(cleanedWaves);
			}
		} catch (error) {
			console.log(error);
		}
	};

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
				await getAllWaves();
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

				const waveTxn = await wavePortalContract.wave('this is a message');
				console.log('Mining...', waveTxn.hash);
				await waveTxn.wait();
				await getAllWaves();
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

				{allWaves.map((wave, index) => {
					return (
						<div key={index} style={{ backgroundColor: 'OldLace', marginTop: '16px', padding: '8px' }}>
							<div>Address: {wave.address}</div>
							<div>Time: {wave.timestamp.toString()}</div>
							<div>Message: {wave.message}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default App;
