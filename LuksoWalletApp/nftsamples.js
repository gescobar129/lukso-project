// Imports
const Web3 = require('web3');
const {ERC725} = require('@erc725/erc725.js');
require('isomorphic-fetch');
const LSP4Schema = require('@erc725/erc725.js/schemas/LSP4DigitalAsset.json');
const LSP4 = require('@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json');

// Static variables
const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';
const SAMPLE_ASSET_ADDRESS = '0xB3F00730367CC952e328eb43AC2E4B18050e6665';

// Parameters for the ERC725 instance
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = {ipfsGateway: IPFS_GATEWAY};

// Fetchable Asset information
let assetImageLinks = [];
let fullSizeAssetImage;
let assetIconLinks = [];
let fullSizeIconImage;
let assetDescription;

/*
 * Get the dataset of an asset
 *
 * @param address of the asset
 * @return string of the encoded data
 */
async function fetchAssetData(address) {
  try {
    const digitalAsset = new ERC725(LSP4Schema, address, provider, config);
    return await digitalAsset.fetchData('LSP4Metadata');
  } catch (error) {
    console.log('Could not fetch asset data: ', error);
  }
}

/*
 * Read properties of an asset
 */
async function getAssetProperties(assetJSON) {
  let assetImageData = [];
  let iconImageData = [];
  try {
    if (assetJSON.value.LSP4Metadata.images[0]) {
      assetImageData = assetJSON.value.LSP4Metadata.images;
      for (let i in assetImageData) {
        assetImageLinks.push([
          i,
          assetImageData[i].url.replace('ipfs://', IPFS_GATEWAY),
        ]);
      }
      console.log(
        'Asset Image Links: ' +
          JSON.stringify(assetImageLinks, undefined, 2) +
          '\n',
      );

      fullSizeAssetImage = assetImageLinks[0][1];
      console.log('Full Size Asset Image Link: ' + fullSizeAssetImage + '\n');
    } else {
      console.log('Asset does not have image data \n');
    }

    if (assetJSON.value.LSP4Metadata.icon[0]) {
      iconImageData = assetJSON.value.LSP4Metadata.icon;
      for (let i in iconImageData) {
        assetIconLinks.push([
          i,
          iconImageData[i].url.replace('ipfs://', IPFS_GATEWAY),
        ]);
      }

      console.log(
        'Asset Icon Links: ' +
          JSON.stringify(assetIconLinks, undefined, 2) +
          '\n',
      );

      fullSizeIconImage = assetIconLinks[0][1];
      console.log('Full Size Icon Image Link: ' + fullSizeIconImage + '\n');
    } else {
      console.log('Asset does not have icon data');
    }

    if (assetJSON.value.LSP4Metadata.description) {
      assetDescription = assetJSON.value.LSP4Metadata.description;
      console.log('Asset Description: ' + assetDescription + '\n');
    } else {
      console.log('Asset does not have description data \n');
    }
  } catch (error) {
    console.log('Could not fetch all asset properties: ', error);
  }
}
// Debug
let assetUrl = '';

fetchAssetData(SAMPLE_ASSET_ADDRESS).then(assetData => {
  // console.log(
  //   JSON.stringify(assetData.value.LSP4Metadata.images[0][0].url, undefined, 2),
  // );
  getAssetProperties(assetData);

  assetUrl = JSON.stringify(assetData.value.LSP4Metadata.images[0][0].url);
  console.log(assetUrl);
  // console.log(assetUrl);
  // console.log(assetUrl);
});

export default [
  {
    name: 'Punk1',
    key: '0x01',
    keyType: 'Singleton',
    image: 'https://img.seadn.io/files/5f0421dd923e8e617f4281f943f0ee0b.png',
    valueType: 'bytes',
    price: assetUrl,
  },
  {
    name: 'Punk2',
    key: '0x02',
    keyType: 'Singleton',
    image:
      'https://img.seadn.io/files/cf9827f4f2e678fb2957f593ae9db071.png?fit=max&w=600',
    valueType: 'bytes',
    price: '6000 LYXE',
  },
  {
    name: 'Punk3',
    key: '0x03',
    keyType: 'Singleton',
    image:
      'https://img.seadn.io/files/cd998f0f9712d3644acae67933fbb26c.png?fit=max&w=600',
    valueType: 'bytes',
    price: '6000 LYXE',
  },
  {
    name: 'Punk4',
    key: '0x04',
    keyType: 'Singleton',
    image:
      'https://img.seadn.io/files/5bd5303d60d0f20f45ac30026b04fcd1.png?fit=max&w=600',
    valueType: 'bytes',
    price: '6000 LYXE',
  },
  {
    name: 'Punk5',
    key: '0x05',
    keyType: 'Singleton',
    image:
      'https://img.seadn.io/files/4073f790953844e16bb00a102c9db505.png?auto=format&fit=max&w=640',
    valueType: 'bytes',
    price: '6000 LYXE',
  },
  {
    name: 'Punk6',
    key: '0x06',
    keyType: 'Singleton',
    image:
      'https://img.seadn.io/files/29e06ede48e81b31b1895f69eade4f4b.png?fit=max&w=600',
    valueType: 'bytes',
    price: '6000 LYXE',
  },
  {
    name: 'Punk7',
    key: '0x07',
    keyType: 'Singleton',
    image:
      'https://img.seadn.io/files/f945305c4d57360a1eaf388cdf81795c.png?auto=format&fit=max&w=640',
    valueType: 'bytes',
    price: '6000 LYXE',
  },
  {
    name: 'Punk8',
    key: '0x08',
    keyType: 'Singleton',
    image:
      'https://img.seadn.io/files/21496b3952e5b7e19a144163e75da2b3.png?fit=max&w=600',
    valueType: 'bytes',
    price: '6000 LYXE',
  },
];
