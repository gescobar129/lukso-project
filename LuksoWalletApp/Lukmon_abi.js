export default [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "img",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "LSP4TokenNameNotEditable",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "LSP4TokenSymbolNotEditable",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "LSP8CannotSendToAddressZero",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "LSP8CannotUseAddressZeroAsOperator",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "LSP8InvalidTransferBatch",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "LSP8NonExistentTokenId",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "caller",
				"type": "address"
			}
		],
		"name": "LSP8NotTokenOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "caller",
				"type": "address"
			}
		],
		"name": "LSP8NotTokenOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenReceiver",
				"type": "address"
			}
		],
		"name": "LSP8NotifyTokenReceiverContractMissingLSP1Interface",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenReceiver",
				"type": "address"
			}
		],
		"name": "LSP8NotifyTokenReceiverIsEOA",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "LSP8TokenIdAlreadyMinted",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "AuthorizedOperator",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "dataKey",
				"type": "bytes32"
			}
		],
		"name": "DataChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "RevokedOperator",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "force",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "authorizeOperator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "dataKeys",
				"type": "bytes32[]"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "bytes[]",
				"name": "dataValues",
				"type": "bytes[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "dataKey",
				"type": "bytes32"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "dataValue",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMonInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "getOperatorsOf",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "isOperatorFor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "revokeOperator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "dataKeys",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes[]",
				"name": "dataValues",
				"type": "bytes[]"
			}
		],
		"name": "setData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "dataKey",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "dataValue",
				"type": "bytes"
			}
		],
		"name": "setData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "tokenIdsOf",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "tokenOwnerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "force",
				"type": "bool"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "from",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "to",
				"type": "address[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "tokenId",
				"type": "bytes32[]"
			},
			{
				"internalType": "bool",
				"name": "force",
				"type": "bool"
			},
			{
				"internalType": "bytes[]",
				"name": "data",
				"type": "bytes[]"
			}
		],
		"name": "transferBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "force",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			}
		],
		"name": "transferMon",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]