import AsyncStorage from '@react-native-community/async-storage';
import React, { useReducer, useState } from 'react';
import { createContext } from 'use-context-selector';

export interface Asset {
	name: string;
	amount: string;
	symbol: string;
	image: string;
}

export interface Vault {
	address: string;
	assets: Asset[];
}

export interface Profile {
	address: string;
	profileData: any;
	assets: Asset[]
}

export interface Wallet {
	address: string;
	publicKey: string;
	privateKey: string;
	seed: string;
	assets: Asset[]
}

export interface Transaction { }

export interface AppState {
	totalBalance: string;
	transactions: Transaction[];
	appInitialized: boolean;
	wallet?: Wallet;
	profile?: Profile;
	nftVault?: Vault;
	assetVault?: Vault;
}

type Action =
	| { type: 'set_profile'; profile: Profile }
	| { type: 'set_nftVault'; nftVault: Vault }
	| { type: 'set_assetVault'; assetVault: Vault }
	| { type: 'set_totalBalance'; balance: string }
	| { type: 'set_transactions'; transactions: Transaction[] }
	| { type: 'set_wallet'; wallet: Wallet }
	| { type: 'set_appstate'; appstate: AppState }
	| { type: 'set_appinitialized'; appInitialized: boolean }
	| { type: 'set_profileassets'; assets: Asset[] }
	| { type: 'set_walletassets'; assets: Asset[] }
	| { type: 'set_assetvaultassets'; assets: Asset[] }

export type Dispatch = (action: Action) => void;

export const initialState: AppState = {
	totalBalance: '0',
	transactions: [],
	appInitialized: false,
	wallet: undefined,
	profile: undefined,
	nftVault: undefined,
	assetVault: undefined
}

const store = createContext(initialState)
const { Provider } = store;

// @ts-ignore
const StateProvider = ({ children }) => {

	const [state, dispatch] = useReducer((state: AppState, action: Action) => {
		switch (action.type) {
			case 'set_wallet': return { ...state, wallet: action.wallet }
			case 'set_totalBalance': return { ...state, totalBalance: action.balance }
			case 'set_transactions': return { ...state, transactions: action.transactions }
			case 'set_profile': return { ...state, profile: action.profile }
			case 'set_nftVault': return { ...state, nftVault: action.nftVault }
			case 'set_assetVault': return { ...state, assetVault: action.assetVault }
			case 'set_appstate': return { ...state, ...action.appstate }
			case 'set_appinitialized': return { ...state, appInitialized: action.appInitialized }
			case 'set_assetvaultassets': return { ...state, assetVault: state.assetVault ? { ...state.assetVault, assets: action.assets } : undefined }
			case 'set_profileassets': return { ...state, profile: state.profile ? { ...state.profile, assets: action.assets } : undefined }
			case 'set_walletassets': return { ...state, wallet: state.wallet ? { ...state.wallet, assets: action.assets } : undefined }
			default: return state
		}
	}, initialState)


	return <Provider value={[state, dispatch]}>{children}</Provider>
}

export { StateProvider, store }