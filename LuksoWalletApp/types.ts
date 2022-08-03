// TODO: Finish wallet connect integration
import WalletConnect from '@walletconnect/client';

export interface WalletReducer {
	pendingRedirect: boolean;
	sessions: { [peerId: string]: WalletConnect };
	walletConnectUris: string[];
}

export interface walletWithKey {
	address: string;
	name: string;
	seed: string;
	privateKey: string;
	publicKey: string | undefined;
}

export interface assetType {
	name: string;
	balanceUSD: number;
	label: string;
	image: string;
	balance: number;
	symbol: string;
	price: number;
	contract: string | null;
}

export interface tokenCategory {
	appId: string;
	appName: string;
	image: string;
	tokens: assetType[];
}

export interface networkType {
	chainId: number;
	name: string;
	total: number;
	wallet: assetType[];
	tokenCategories: tokenCategory[];
}

export interface transaction {
	hash: string;
	timeStamp: string;
	value: string;
	input: string;
	methodName: string;
	to: string;
	network: number;
}