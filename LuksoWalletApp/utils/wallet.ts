import { TransactionRequest, JsonRpcProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import * as Bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import _ from 'lodash';
import { Dispatch } from 'react';
import { getAuthData, removeAuthData, upsertAuthData } from './authData';
import { decrypt, encrypt } from './crypto';
import { networkData } from './networks';
import { loadCryptoBalances } from './loadCryptoBalances';
import { WalletReducer, walletWithKey } from '../types';
import { AsyncStorage } from 'react-native-async-storage';
// import { walletConnectLoadState } from 'utils/connectToDapp';

// actions
let SET_CRYPTO_BALANCE = ""
let SET_WALLET_ADDRESS = ""
let SET_WALLET_SEED_PHRASE = ""
let ENCRYPTION_KEY_WALLET = "some_key"

//Cant use ethers createRandom due to performance
export async function getMnemonic() {
	const entropy = ethers.utils.randomBytes(16);
	const mnemonic = ethers.utils.entropyToMnemonic(entropy);
	return mnemonic;
}
//Cant use ethers fromMnemonic due to performance
export async function recoverWalletWithMnemonicKey(
	dispatch: Dispatch<{
		payload: unknown;
		type: string;
	}>,
	mnemonic: string,
	index?: number,
) {
	try {
		//const wallet = ethers.Wallet.fromMnemonic(mnemonic);
		const seed = await Bip39.mnemonicToSeed(mnemonic);
		const hdNode = hdkey.fromMasterSeed(seed);
		const node = hdNode.derivePath(`m/44'/60'/0'`);
		// m/44'/60'/0'/0
		const change = node.deriveChild(0);
		// m/44'/60'/0'/0/{N}
		const childNode = change.deriveChild(index || 0);
		const childWallet = childNode.getWallet();
		const wallet = new ethers.Wallet(
			childWallet.getPrivateKey().toString('hex'),
		);
		dispatch({
			type: SET_WALLET_ADDRESS,
			payload: wallet.address,
		});
		dispatch({
			type: SET_WALLET_SEED_PHRASE,
			payload: encrypt(mnemonic, ENCRYPTION_KEY_WALLET),
		});
		const resultWallet = {
			address: wallet.address,
			publicKey: wallet.publicKey,
			privateKey: wallet.privateKey,
			name: 'default',
			seed: mnemonic,
		};
		await addWallet(resultWallet);
		loadCryptoBalances(wallet.address, dispatch);
		return {
			success: true,
			wallet: resultWallet,
		};
	} catch (e) {
		return { success: false };
	}
}

export const deleteWallet = async (
	dispatch: Dispatch<{
		payload: unknown;
		type: string;
	}>,
): Promise<boolean> => {
	const datac = await removeAuthData('default'); //for multiwallet support this would have to be changed with the name
	dispatch({ type: SET_WALLET_ADDRESS, payload: '' });
	dispatch({ type: SET_WALLET_SEED_PHRASE, payload: '' });
	return datac;
};

export const addWallet = async (wallet: walletWithKey): Promise<boolean> => {
	// const wallets = await getWallets();

	// if (wallets.find(w => w.name === wallet.name))
	// 	throw new Error('Wallet with that name already exists');

	return upsertAuthData({
		authData: {
			default: {
				address: wallet.address,
				seed: encrypt(wallet.seed, ENCRYPTION_KEY_WALLET),
				name: 'default',
				privateKey: wallet.privateKey,
				publicKey: wallet.publicKey,
			},
		},
	});
};
export const getWalletAddress = async () => {
	return (await getWallet())?.address;
};
//THESE FUNCTIONS ARE NOT EXPORTED TO ENSURE PROPER KEY HANDELING
const getWallets = async (): Promise<walletWithKey[]> => {
	const authData = await getAuthData();
	return _.map(authData, ({ address, seed, privateKey, publicKey }, name) => {
		return { name, address, seed, privateKey, publicKey };
	});
};

const getWallet = async (): Promise<walletWithKey | undefined> => {
	const wallets = await getWallets();
	return wallets[0];
};
const sanitize = (s = ''): string => s.toLowerCase().replace(/[^a-z]/g, '');
export const formatSeedStringToArray = (seed: string): string[] => {
	return seed
		.trim()
		.replace(/[\n\r]/g, ' ')
		.replace(/\s\s+/g, ' ')
		.split(' ')
		.map(sanitize);
};

export async function getProvider(chainId: number) {
	return new JsonRpcProvider(
		_.get(networkData, chainId).rpc_endpoint as string,
		chainId,
	);
}
const getEthersWallet = async (chainId: number) => {
	const wallet = await getWallet();
	if (wallet)
		return new ethers.Wallet(
			(await getWallet())!.privateKey,
			await getProvider(chainId),
		);
	else throw ReferenceError('No wallet defined');
};
export async function sendTransaction(tx: TransactionRequest) {
	if (!tx.chainId)
		throw ReferenceError(
			'Chain ID has to be provided, to detect appropriate provider',
		);
	return (await getEthersWallet(tx.chainId)).sendTransaction(tx);
}
export async function signMessage(message: string, chainId: number) {
	let m = message as string | Uint8Array;
	if (message.slice(0, 2) === '0x') {
		m = ethers.utils.arrayify(m);
	}
	return (await getEthersWallet(chainId)).signMessage(m);
}
export async function sendRPCCall(
	chainId: number,
	method: string,
	params: any[],
) {
	return (await getProvider(chainId)).send(method, params);
}
export async function getGasPrice(chainId: number) {
	return (await getProvider(chainId)).getGasPrice();
}

export const initPage = async (
	dispatch: Dispatch<{
		payload: unknown;
		type: string;
	}>,
	showModal: any,
	getState: () => { walletReducer: WalletReducer },
): Promise<void> => {
	const signerAddress = await getWalletAddress();
	const alternativeAddress = await AsyncStorage.getItem('WALLET_ADDRESS');
	if ((!signerAddress || signerAddress === '') && alternativeAddress) {
		loadCryptoBalances(alternativeAddress, dispatch);
		dispatch({ type: SET_WALLET_ADDRESS, payload: alternativeAddress });
	} else if (signerAddress && signerAddress !== '') {
		loadCryptoBalances(signerAddress, dispatch);
	}
};

export const decryptKey = (encryptedKey: string, password: string): string => {
	try {
		return decrypt(encryptedKey, password);
	} catch {
		throw new Error('Incorrect password');
	}
};