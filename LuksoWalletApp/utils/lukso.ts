// import { LSPFactory, ProfileDeploymentOptions } from '@lukso/lsp-factory.js'
import { ethers, utils } from 'ethers'
import LSP0Profile from '../artifacts/contracts/LSP0ERC725Account/LSP0ERC725Account.sol/LSP0ERC725Account.json'
import Web3 from 'web3'
import constants from "@lukso/lsp-smart-contracts/constants.js";
import LSP9Vault from '../artifacts/contracts/LSP9Vault/LSP9Vault.sol/LSP9Vault.json';
import LSP1UniversalReceiverDelegateVault from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateVault.json';
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfileSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import LSP4schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import LSP8IdentifiableDigitalAssetSchema from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json'
import LSP8Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP8Mintable.json';

import { Dispatch, Profile, store, Vault, Wallet } from '../store';
import { useAssetVault, useProfile, useWallet } from '../hooks';
import Lukmon_abi from '../Lukmon_abi';
import Lukmon_bytecode from '../Lukmon_bytecode';

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

const URD_DATA_KEY = constants.ERC725YKeys.LSP0.LSP1UniversalReceiverDelegate;

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
	try {
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

		console.log('deployed 1st vault!')


		const deployTx2 = await vaultContract.deploy({
			data: LSP9Vault.bytecode,
			arguments: [owner]
		}).send({
			from: masterAddress,
			gas: 4967295,
			gasPrice: '36967295'
		})

		console.log('deployed 2nd vault!')


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

		return [deployTx1.options.address, deployTx2.options.address]
	} catch (err) {
		console.log('errrr deploying contracts', err)
	}

}

export const setupURD = async (owner: Wallet, vaultAddress: string, profileAddress: string) => {
	console.log({ owner, vaultAddress, profileAddress })
	try {
		const urdVault = new web3.eth.Contract(LSP1UniversalReceiverDelegateVault.abi);
		urdVault.defaultAccount = owner.address



		console.log('deploying...')
		const deployTx = await urdVault
			.deploy({
				data: LSP1UniversalReceiverDelegateVault.bytecode
			})
		// .send({
		// 	from: masterAddress,
		// 	gas: 5_000_000,
		// 	gasPrice: '1000000000',
		// });

		const createTransaction = await web3.eth.accounts.signTransaction(
			{
				from: owner.address,
				data: deployTx.encodeABI(),
				gas: '36967295',
			},
			owner.privateKey
		);

		const createReceipt = await web3.eth.sendSignedTransaction(
			createTransaction.rawTransaction
		);


		console.log('deployed.....')

		const vaultContract = new web3.eth.Contract(LSP9Vault.abi, vaultAddress);
		const profileContract = new web3.eth.Contract(LSP0Profile.abi, profileAddress);

		console.log('got instances.....')

		console.log('createreciept', createReceipt.contractAddress)
		console.log('url_data_key', URD_DATA_KEY)

		// encode setData Payload on the Vault
		const setDataPayload = await vaultContract.methods[
			"setData(bytes32,bytes)"
		](URD_DATA_KEY, createReceipt.contractAddress).encodeABI();

		// const executePayload = await profileContract.methods.execute(
		// 	0,
		// 	vaultAddress,
		// 	0,
		// 	setDataPayload
		// ).encodeABI();

		console.log('set payload data.....')


		const executeTx = await profileContract.methods.execute(0, vaultAddress, 0, setDataPayload)
		// .send({
		// 	from: masterAddress,
		// 	gasLimit: 600_000
		// })

		const executeTxSigned = await web3.eth.accounts.signTransaction(
			{
				from: owner.address,
				data: executeTx.encodeABI(),
				gas: '36967295',
			},
			owner.privateKey
		);

		const createReceipt2 = await web3.eth.sendSignedTransaction(
			executeTxSigned.rawTransaction
		);


		return createReceipt2

		// TODO: save URD vault to storage
	} catch (err) {
		console.log('PPPPP', err)
	}

}


export const deployContracts = async (owner: string = "0x45BaBF7c6A484b65b08d4453569351c52433d424") => {
	const profileAddress = await deployUniversalProfile(owner)
	const vaultTx = await deployVaults(profileAddress || '')
}


export const fetchUniversalProfile = async (address: string) => {

}

export const fetchLuksoBalances = async ({ wallet, profile, assetVault }: { wallet: Wallet; profile: Profile; assetVault: Vault }, dispatch: Dispatch) => {
	try {
		const [walletBalance, profileBalance, assetBalance] = await Promise.all([
			web3.eth.getBalance(wallet.address),
			web3.eth.getBalance(profile.address),
			web3.eth.getBalance(assetVault.address)
		])

		if (wallet.assets.length && wallet.assets[0].amount !== web3.utils.fromWei(walletBalance, "ether")) {
			let wamount = web3.utils.fromWei(walletBalance, "ether")
			let pamount = web3.utils.fromWei(profileBalance, "ether");
			let aamount = web3.utils.fromWei(assetBalance, "ether")
			dispatch({
				type: 'set_profileassets',
				assets:
					[{
						name: 'Lukso',
						amount: pamount,
						symbol: 'LUKSO',
						image: ''
					}]

			})

			dispatch({
				type: 'set_walletassets',
				assets:
					[{
						name: 'Lukso',
						amount: wamount,
						symbol: 'LUKSO',
						image: ''
					}]

			})

			dispatch({
				type: 'set_assetvaultassets',
				assets:
					[{
						name: 'Lukso',
						amount: aamount,
						symbol: 'LUKSO',
						image: ''
					}]

			})

			dispatch({
				type: 'set_totalBalance',
				balance: String(Number(wamount) + Number(wamount) + Number(aamount))
			})
		}
		console.log({ walletBalance, profileBalance, assetBalance })
	} catch (err) {
		console.log('errr', err)
	}
}

export const transferLuksoToken = async (amount: string, to: string, sender: Wallet) => {
	try {
		const nonce = await web3.eth.getTransactionCount(sender.address, 'latest');

		const transaction = {
			to, // faucet address to return eth
			value: web3.utils.toWei(amount, 'ether'),
			gas: 4967295,
			gasPrice: '36967295',
			nonce
		};

		const signedTx = await web3.eth.accounts.signTransaction(transaction, sender.privateKey);
		await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

	} catch (err) {
		console.log('err', err)
	}
}

export const deployMonster = async (owner: string) => {
	console.log('Deploying monster.....');

	try {
		const lsp8 = new web3.eth.Contract(Lukmon_abi)
		lsp8.defaultAccount = masterAddress

		const deployTx = await lsp8.deploy({
			data: Lukmon_bytecode,
			arguments: ['Lukmon#42069', 'LMON', owner, "https://i.ibb.co/F5qy06x/walking.gif"]
		}).send({
			from: masterAddress,
			gas: 4967295,
			gasPrice: '36967295'
		})



		console.log('deploytcx', deployTx.options.address)
		console.log('OWNER', owner)
		console.log('BYTES', web3.utils.hexToBytes(web3.utils.asciiToHex('hello')))
		console.log('HEX', web3.utils.asciiToHex('1000'))
		// await deployTx.methods.mint(owner, web3.utils.asciiToHex('1000'), false, web3.utils.asciiToHex(JSON.stringify({ imageUri: "some_uri", monsterType: "hatched" }))).send({
		// 	from: masterAddress,
		// 	gas: 4967295,
		// 	gasPrice: '36967295'
		// })

		const data = await deployTx.methods.getMonInfo().call({
			from: masterAddress
		})

		console.log('call data', data)

		// console.log('executeTX', executeTx)
		// const executeTxSigned = await web3.eth.accounts.signTransaction(
		// 	{
		// 		from: masterAddress,
		// 		data: executeTx.encodeABI(),
		// 		gas: '36967295',
		// 	},
		// 	masterKey
		// );

		console.log('deployed monster!!!')

		return deployTx.options.address

	} catch (error) {
		console.log('Something went wrong...', error)
	}
}

export const fetchassets = async (address: string, type: 'vault' | 'universal_profile' | 'wallet') => {
	let provider = new Web3.providers.HttpProvider(luksoProvider)
	const config = { ipfsGateway: 'https://2eff.lukso.dev/ipfs/' };

	try {
		const profile = new ERC725(
			UniversalProfileSchema,
			'0x2A3a50Ca603c76FD9B2AebbB3fAA627117f46b1e',
			provider,
			config
		);

		const result = await profile.fetchData('LSP5ReceivedAssets[]');
		const ownedAssets = result.value;
		console.log('owned asssets', ownedAssets)

		const ownedAssetsMetadata = await ownedAssets.map(async (ownedAsset) => {
			const digitalAsset = new ERC725(LSP4schema, ownedAsset, provider, config);

			console.log(await digitalAsset.fetchData('LSP4Metadata'));
		});

		// console.log(ownedAssetsMetadata)
	} catch (err) {
		console.log(err)
	}
}

// export const testtokens = async () => {
// 	try {
// 		const lspFactory = new LSPFactory(luksoProvider, {
// 			deployKey: masterKey, // Private key of the account which will deploy smart contracts
// 			chainId: 2828,
// 		});
// 		await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
// 			digitalAssetMetadata: {
// 				description: "My Digital Asset",
// 				links: [{
// 					title: "LUKSO Docs",
// 					url: "https://docs.lukso.tech"
// 				}],
// 			},
// 			controllerAddress: masterAddress,
// 			name: 'TESTINNNNGGGG',
// 			symbol: 'TEST'
// 		});
// 	} catch (err) {
// 		console.log('error deploying....', err)
// 	}
// }