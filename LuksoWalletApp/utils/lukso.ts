import { LSPFactory, ProfileDeploymentOptions } from '@lukso/lsp-factory.js'
import { ethers } from 'ethers'
import LSP0Profile from '../artifacts/contracts/LSP0ERC725Account/LSP0ERC725Account.sol/LSP0ERC725Account.json'
// import LSP9Vault from '../artifacts/contracts/LSP9Vault/LSP9Vault.sol/LSP9Vault.json';

let luksoProvider = 'https://rpc.l16.lukso.network'
let masterKey = '02d67249b78d6ce7bd135c39ba8ac747cb20514c6d838738aac92f79757089a2'

export const lspFactory = (deployKey: string) => new LSPFactory(luksoProvider, {
	deployKey,
	chainId: 22
})


export const providerRPC = {

}


export const createAndDeployUniversalProfile = async (params: ProfileDeploymentOptions) => {
	try {


		const provider = new ethers.providers.StaticJsonRpcProvider(luksoProvider, {
			name: 'L16',
			chainId: 2828
		})

		console.log('block number', ethers.providers.getNetwork(2828))
		const wallet = new ethers.Wallet(masterKey, provider)
		console.log('wallet', wallet)

		const abi = [
			"constructor(address newOwner)"
		];

		const lsp0 = new ethers.ContractFactory(abi, LSP0Profile.bytecode, wallet)
		console.log('MASTERKEY', lsp0)

		const contract = await lsp0.deploy("0xA313FdE48C3b6394dA0491b6dF30462B52bb367e")
		await contract.deployed()

		console.log('Contract DePLOYED!', contract.address)
		// const deployedContracts = await lspFactory(masterKey).UniversalProfile.deploy(params)

		// console.log('Contracts Deployed!', deployedContracts)
		// return deployedContracts

	} catch (err) {
		console.log('Error deploying', err)
	}
}

export const fetchUniversalProfile = async (address: string) => {

}