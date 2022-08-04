import { LSPFactory, ProfileDeploymentOptions } from '@lukso/lsp-factory.js'
import { ethers } from 'ethers'
import LSP0Profile from '../artifacts/contracts/LSP0ERC725Account/LSP0ERC725Account.sol/LSP0ERC725Account.json'
import Web3 from 'web3'
import LSP9Vault from '../artifacts/contracts/LSP9Vault/LSP9Vault.sol/LSP9Vault.json';

let luksoProvider = 'https://rpc.l16.lukso.network'
let masterKey = '02d67249b78d6ce7bd135c39ba8ac747cb20514c6d838738aac92f79757089a2'
let masterAddress = '0xA313FdE48C3b6394dA0491b6dF30462B52bb367e'
// export const lspFactory = (deployKey: string) => new LSPFactory(luksoProvider, {
// 	deployKey,
// 	chainId: 22
// })

var web3 = new Web3(new Web3.providers.HttpProvider(luksoProvider));
web3.eth.defaultCommon = { customChain: { name: 'L16', chainId: 2828, networkId: 0xB0C } };
web3.eth.accounts.wallet.add(masterKey)

export const deployUniversalProfile = async (owner: string) => {
	try {

		console.log('deploying Universal Profile...')

		const profileContract = new web3.eth.Contract(LSP0Profile.abi)
		profileContract.defaultAccount = masterAddress


		const deployTx = profileContract.deploy({
			data: LSP0Profile.bytecode,
			arguments: [masterAddress]
		})

		const createTransaction = await web3.eth.accounts.signTransaction(
			{
				from: masterAddress,
				data: deployTx.encodeABI(),
				gas: '4967295',
			},
			masterKey
		);

		const createReceipt = await web3.eth.sendSignedTransaction(
			createTransaction.rawTransaction
		);
		console.log('Contract deployed at address', createReceipt.contractAddress);

		return createReceipt.contractAddress


	} catch (err) {
		console.log('Error deploying', err)
	}

}

export const deployVaults = async (owner: string) => {
	const vaultContract = new web3.eth.Contract(LSP9Vault.abi)
	vaultContract.defaultAccount = masterAddress

	console.log('Deploying Vaults....')

	const deployTx1 = await vaultContract.deploy({
		data: LSP9Vault.bytecode,
		arguments: [owner]
	}).send({
		from: masterAddress,
		gas: 4967295,
		gasPrice: '10000000'
	})

	console.log('Vault 1 Deployed!')
	console.log('Deploying Vault 2...')

	const deployTx2 = await vaultContract.deploy({
		data: LSP9Vault.bytecode,
		arguments: [owner]
	}).send({
		from: masterAddress,
		gas: 4967295,
		gasPrice: '10000000'
	})

	console.log('deployTx', deployTx1)
	console.log('deployTx2', deployTx2)

	return [deployTx1, deployTx2]

}

export const deployContracts = async (owner: string = "0x45BaBF7c6A484b65b08d4453569351c52433d424") => {
	const profileAddress = await deployUniversalProfile(owner)
	const vaultTx = await deployVaults(profileAddress || '')
}


export const fetchUniversalProfile = async (address: string) => {

}