import { LSPFactory, ProfileDeploymentOptions } from '@lukso/lsp-factory.js'
import { ethers } from 'ethers'
import LSP0Profile from '../artifacts/contracts/LSP0ERC725Account/LSP0ERC725Account.sol/LSP0ERC725Account.json'
import Web3 from 'web3'
import LSP9Vault from '../artifacts/contracts/LSP9Vault/LSP9Vault.sol/LSP9Vault.json';
import { Dispatch } from '../store';

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

export const deployUniversalProfile = async (dispatch: Dispatch, owner: string) => {
	try {

		console.log('deploying Universal Profile...')

		const profileContract = new web3.eth.Contract(LSP0Profile.abi)
		profileContract.defaultAccount = masterAddress

		console.log('profilecontract', profileContract)

		const deployTx = profileContract.deploy({
			data: LSP0Profile.bytecode,
			arguments: [owner]
		})

		console.log('deploy tx', deployTx)

		const createTransaction = await web3.eth.accounts.signTransaction(
			{
				from: masterAddress,
				data: deployTx.encodeABI(),
				gas: '36967295',
			},
			masterKey
		);

		console.log('signed transaction', createTransaction)

		const createReceipt = await web3.eth.sendSignedTransaction(
			createTransaction.rawTransaction
		);
		console.log('Contract deployed at address', createReceipt.contractAddress);

		if (!createReceipt.contractAddress) throw Error()

		dispatch({ type: 'set_profile', profile: { address: createReceipt.contractAddress, profileData: {} } })

		return createReceipt.contractAddress


	} catch (err) {
		console.log('Error deploying', err)
	}

}

// TODO: To improve speed we can deploy using create2
// this is a stretch goal
export const deployVaults2 = async (dispatch: Dispatch, owner: string) => {
	try {
		const profileContract = new web3.eth.Contract(LSP0Profile.abi, owner)
		profileContract.defaultAccount = masterAddress

		console.log('deploying Vaults2.....')

		let reciept = await profileContract.methods.execute(2, owner, 0, LSP9Vault.bytecode).send({
			from: masterAddress,
			gas: 4967295,
			gasPrice: '36967295'
		})

		console.log('reciept:', reciept)
	} catch (err) {
		console.log('Err', err)
	}
}

export const deployVaults = async (dispatch: Dispatch, owner: string) => {
	const vaultContract = new web3.eth.Contract(LSP9Vault.abi)
	vaultContract.defaultAccount = masterAddress

	console.log('Deploying Vaults....')

	const deployTx1 = await vaultContract.deploy({
		data: LSP9Vault.bytecode,
		arguments: [owner]
	}).send({
		from: masterAddress,
		gas: 4967295,
		gasPrice: '36967295'
	})

	const deployTx2 = await vaultContract.deploy({
		data: LSP9Vault.bytecode,
		arguments: [owner]
	}).send({
		from: masterAddress,
		gas: 4967295,
		gasPrice: '36969295'
	})




	dispatch({
		type: 'set_nftVault', nftVault: {
			address: deployTx1.options.address,
			assets: []
		}
	})


	dispatch({
		type: 'set_assetVault', assetVault: {
			address: deployTx2.options.address,
			assets: []
		}
	})

	return [deployTx1, deployTx2]

}

export const deployContracts = async (owner: string = "0x45BaBF7c6A484b65b08d4453569351c52433d424") => {
	const profileAddress = await deployUniversalProfile(owner)
	const vaultTx = await deployVaults(profileAddress || '')
}


export const fetchUniversalProfile = async (address: string) => {

}