
import { Dispatch } from 'react';
import RNEventSource from 'react-native-event-source';
import { assetType, networkType, transaction } from '../types';
import { consideredNetworks, networkData } from './networks';
import _ from 'lodash';
import axios from 'axios';

// TODO: allow connection to dapps
import { fetchMethodName } from './connectToDapp';

// TODO: Still need to set up redux
let SET_CRYPTO_BALANCE = 'action_set_crypto_balance'

let ZAPPER_API_KEY = ""
//API Documentation: https://api.zapper.fi/api/static/index.html#/Balances/BalanceController%20getBalances
export async function loadCryptoBalances(
	address: string,
	dispatch: Dispatch<{
		payload: unknown;
		type: string;
	}>,
) {
	dispatch({ type: SET_CRYPTO_BALANCE, payload: ['loading'] });
	let baseURL =
		'https://api.zapper.fi/v2/balances?api_key=' +
		ZAPPER_API_KEY +
		'&useNewBalancesFormat=true&bundled=true';
	consideredNetworks.forEach(network => {
		baseURL = baseURL + '&networks[]=' + _.get(networkData, network).name;
	});
	await new Promise<void>((resolve, reject) => {
		const balances = [] as any[];
		try {
			const events = new RNEventSource(baseURL + '&addresses[]=' + address);
			events.addEventListener('balance', event => {
				balances.push(JSON.parse(event.data!));
			});
			events.addEventListener('end', () => {
				events.removeAllListeners();
				const networks = [] as networkType[];
				consideredNetworks.forEach(consideredNetwork => {
					networks.push({
						name: _.get(networkData, consideredNetwork).name,
						chainId: consideredNetwork,
						total: 0,
						wallet: [],
						tokenCategories: [],
					});
				});
				balances.forEach(balance => {
					if (balance.appId !== 'nft') {
						const networkIndex = networks.findIndex(
							network => network.name === balance.network,
						);
						if (networkIndex === -1) throw Error('Network not supported');
						if (balance.appId === 'tokens') {
							if (networks[networkIndex].wallet.length < 1) {
								const rawWallet = balance.balance.wallet as {
									[K in string]: any;
								};
								const wallet = [] as assetType[];
								let total = networks[networkIndex].total;
								Object.keys(rawWallet).forEach(tokenID => {
									// @ts-ignore
									wallet.push({
										balanceUSD: rawWallet[tokenID].balanceUSD,
										label: rawWallet[tokenID].displayProps.label,
										image: rawWallet[tokenID].displayProps.images[0],
										balance: rawWallet[tokenID].context.balance,
										symbol: rawWallet[tokenID].context.symbol,
										price: rawWallet[tokenID].context.price,
										contract: rawWallet[tokenID].address,
									});
									total += rawWallet[tokenID].balanceUSD;
								});
								networks[networkIndex] = {
									...networks[networkIndex],
									total: total,
									wallet: wallet,
								};
							}
						} else {
							if (
								networks[networkIndex].tokenCategories.findIndex(
									cat => cat.appId === balance.app.id,
								) === -1
							) {
								const rawAppdata = balance.app.data;
								const tokens = [] as assetType[];
								let total = networks[networkIndex].total;
								rawAppdata.forEach((token: any) => {
									if (token.type !== 'position') {
										// @ts-ignore
										tokens.push({
											balanceUSD: token.balanceUSD,
											label: token.displayProps.label,
											image: token.displayProps.images[0],
											balance: token.context.balance,
											symbol: token.context.symbol,
											price: token.context.price,
											contract: token.address,
										});
										total += token.balanceUSD;
									}
								});
								networks[networkIndex] = {
									...networks[networkIndex],
									total: total,
									tokenCategories: [
										...networks[networkIndex].tokenCategories,
										{
											appId: balance.app.id,
											appName: balance.app.displayProps.appName,
											image: balance.app.displayProps.images[0],
											tokens: tokens,
										},
									],
								};
							}
						}
					}
				});
				dispatch({
					type: SET_CRYPTO_BALANCE,
					payload: networks,
				});
				resolve();
			});
		} catch (e) {
			reject(e.message);
		}
	});
}

export const getUserTransactions = async (address: string) => {
	let transactions = [] as transaction[];
	transactions = _.flatten(
		await Promise.all(
			consideredNetworks.map(async network => {
				let url =
					_.get(networkData, network).scan_endpoint +
					'module=account&action=txlist';
				url += '&sort=desc';
				url += '&page=1&offset=10'; //gets the first 10 transactions. Possibility to add pagination later on
				url += '&address=' + address;
				const response = await axios.get(url);
				return Promise.all(
					(response.data.result as transaction[]).map(
						async (tx: transaction) => {
							return {
								...tx,
								network: network,
								methodName: await fetchMethodName(tx.input),
							};
						},
					),
				);
			}),
		),
	);
	transactions = transactions.sort((a, b) =>
		a.timeStamp > b.timeStamp ? -1 : 1,
	);
	return transactions;
};