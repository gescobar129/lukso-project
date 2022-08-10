import React, { useReducer, useState } from 'react';
import { createContext } from 'use-context-selector';

export interface Vault {
	address: string;
	assets: any;
}

export interface Profile {
	address: string;
	profileData: any;
}

export interface Wallet {
	address: string;
	publicKey: string;
	privateKey: string;
	seed: string;
}

export interface Transaction { }

export interface AppState {
	totalBalance: string;
	transactions: Transaction[];
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

export type Dispatch = (action: Action) => void;

const initialState: AppState = {
	totalBalance: '0',
	transactions: [],
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
		console.log('action', action)
		switch (action.type) {
			case 'set_wallet': return { ...state, wallet: action.wallet }
			case 'set_totalBalance': return { ...state, totalBalance: action.balance }
			case 'set_transactions': return { ...state, transactions: action.transactions }
			case 'set_profile': return { ...state, profile: action.profile }
			case 'set_nftVault': return { ...state, nftVault: action.nftVault }
			case 'set_assetVault': return { ...state, assetVault: action.assetVault }
			default: return state
		}
	}, initialState)


	return <Provider value={[state, dispatch]}>{children}</Provider>
}

export { StateProvider, store }