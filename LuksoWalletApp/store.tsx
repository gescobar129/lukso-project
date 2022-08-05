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
	profile: Profile;
	nftVault: Vault;
	assetVault: Vault;
}

export interface Transaction { }

export interface AppState {
	wallet?: Wallet;
	totalBalance: string;
	transactions: Transaction[];
}

const initialState: AppState = {
	wallet: undefined,
	totalBalance: '0',
	transactions: []
}

const store = createContext(initialState)
const { Provider } = store;

// @ts-ignore
const StateProvider = ({ children }) => {
	// @ts-ignore
	const [state, dispatch] = useReducer((state: AppState, action: { type: string; payload: string | Transaction[] | Wallet; }) => {
		switch (action.type) {
			case 'set_wallet': return { ...state, wallet: action.payload }
			case 'set_totalBalance': return { ...state, totalBalance: action.payload }
			case 'set_transactions': return { ...state, transactions: action.payload }
			default: return state
		}
	}, initialState)

	// @ts-ignore
	return <Provider value={useState({ state, dispatch })}>{children}</Provider>
}

export { StateProvider, store }