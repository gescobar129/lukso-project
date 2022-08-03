// TODO: GET KEYS
let ARBITRUMSCAN_API_KEY = ""
let ARBITRUM_RPC_API_KEY = ""
let AVALANCHESCAN_API_KEY = ""
let ETHEREUM_RPC_API_KEY = ""
let ETHERSCAN_API_KEY = ""
let OPTIMISMSCAN_API_KEY = ""
let OPTIMISM_RPC_API_KEY = ""
let POLYGONSCAN_API_KEY = ""
let POLYGON_RPC_API_KEY = ""

export const consideredNetworks = [1, 137, 10, 100, 2828, 42220, 42161, 43114];
export const networkData = {
	1: {
		name: 'ethereum',
		// image: require('../assets/images/network_icons/ethereum-icon.png'),
		nativeCurrencyContract: '0x0000000000000000000000000000000000000000',
		rpc_endpoint:
			'https://eth-mainnet.g.alchemy.com/v2/' + ETHEREUM_RPC_API_KEY,
		scan_endpoint:
			'https://api.etherscan.io/api?apikey=' + ETHERSCAN_API_KEY + '&',
	},
	137: {
		name: 'polygon',
		// image: require('../assets/images/network_icons/polygon-icon.png'),
		nativeCurrencyContract: '0x0000000000000000000000000000000000001010',
		rpc_endpoint:
			'https://polygon-mainnet.g.alchemy.com/v2/' + POLYGON_RPC_API_KEY,
		scan_endpoint:
			'https://api.polygonscan.com/api?apikey=' + POLYGONSCAN_API_KEY + '&',
	},
	10: {
		name: 'optimism',
		nativeCurrencyContract: '0x0000000000000000000000000000000000000000',
		// image: require('../assets/images/network_icons/optimism-icon.png'),
		rpc_endpoint:
			'https://opt-mainnet.g.alchemy.com/v2/' + OPTIMISM_RPC_API_KEY,
		scan_endpoint:
			'https://api-optimistic.etherscan.io/api?apikey=' +
			OPTIMISMSCAN_API_KEY +
			'&',
	},
	2828: {
		name: 'Lukso',
		// TODO: Add native currency contract
		nativeCurrencyContract: '',
		rpc_endpoint: 'https://rpc.l16.lukso.network/',
		scan_endpoint: 'https://explorer.execution.l16.lukso.network/'
	},
	42161: {
		name: 'arbitrum',
		// image: require('../assets/images/network_icons/arbitrum-icon.png'),
		nativeCurrencyContract: '0x0000000000000000000000000000000000000000',
		rpc_endpoint:
			'https://arb-mainnet.g.alchemy.com/v2/' + ARBITRUM_RPC_API_KEY,
		scan_endpoint:
			'https://api.arbiscan.io/api?apikey=' + ARBITRUMSCAN_API_KEY + '&',
	},
	43114: {
		name: 'avalanche',
		// image: require('../assets/images/network_icons/avalanche-icon.png'),
		nativeCurrencyContract: '0x0000000000000000000000000000000000000000',
		rpc_endpoint: 'https://api.avax.network/ext/bc/C/rpc',
		scan_endpoint:
			'https://api.snowtrace.io/api?apikey=' + AVALANCHESCAN_API_KEY + '&',
	},
	80001: {
		name: 'mumbai',
		nativeCurrencyContract: '0x0000000000000000000000000000000000001010',
		// image: require('../assets/images/network_icons/polygon-icon.png'),
		rpc_endpoint: 'https://polygon-mumbai.g.alchemy.com/v2/',
		scan_endpoint: '',
	},
};