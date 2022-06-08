const main = async () => {
	const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
	const waveContract = await waveContractFactory.deploy({
		/**
		 * We are giving some ethers to the Contract
		 */
		value : hre.ethers.utils.parseEther('0.1')
	});

	await waveContract.deployed();
	console.log('Contract addy :', waveContract.address);

	/*
   	* Get Contract balance
   	*/
	let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log('Contract Balance', hre.ethers.utils.formatEther(contractBalance));

	let waveCount = await waveContract.getTotalWaves();
	console.log(waveCount.toNumber);

	/*
   	* Sending wave
   	*/
	let waveTxn = await waveContract.wave('A message');
	await waveTxn.wait(); // Wait for the transaction to be mined.

	/**
	 * Get contract balance to see what happened.
	 */
	contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log('New Contract balance:', hre.ethers.utils.formatEther(contractBalance));
	/*
   	* Get All Waves
   	*/
	let allWaves = await waveContract.getAllWaves();
	console.log(allWaves);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
