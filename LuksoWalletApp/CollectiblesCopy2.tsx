import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import NftView from './NftView';
import nftsamples from './nftsamples';
import {Card, Text} from '@ui-kitten/components';
import {CurrentRenderContext} from '@react-navigation/native';
// Imports
const Web3 = require('web3');
const {ERC725} = require('@erc725/erc725.js');
const erc725schema = require('@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json');
require('isomorphic-fetch');
const LSP4Schema = require('@erc725/erc725.js/schemas/LSP4DigitalAsset.json');
const LSP4 = require('@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json');

// Static variables
const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';
// const SAMPLE_ASSET_ADDRESS = '0xbe3077b18fedeb2c3d2d2a3390d4eb102c2083f8';
const SAMPLE_ASSET_ADDRESS = '0xB3F00730367CC952e328eb43AC2E4B18050e6665';
const SAMPLE_PROFILE_ADDRESS = '0xF7f6253011Da57Cb1c226E0774eF4e50330a667D';

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

const numColumns = 2;
const WIDTH = Dimensions.get('window').width;

const Collectibles = () => {
  const [nftAssets, setnftAssets] = useState([]);
  const [nftUrls, setnftUrls] = useState([]);
  const [nftDescription, setnftDescription] = useState([]);
  const [walletsAssets, setwalletsAssets] = useState([]);

  async function fetchOwnedAssets(address) {
    try {
      const profile = new ERC725(erc725schema, address, provider, config);
      // const result = await profile.fetchData("LSP12IssuedAssets[]");
      const result = await profile.fetchData('LSP5ReceivedAssets[]');
      return result.value;
    } catch (error) {
      return console.log('This is not an ERC725 Contract: ', error);
    }
  }

  useEffect(() => {
    fetchOwnedAssets(SAMPLE_PROFILE_ADDRESS).then(async ownedAssets => {
      setwalletsAssets(ownedAssets);
    });
  }, []);

  // console.log(walletsAssets, 'send me the addy im litt!!!!!!!!!!!!!!!!!!!!');

  // console.log(nftAssets);
  let filteredNft = [];

  useEffect(() => {
    async function fetchAssetData(address) {
      try {
        const digitalAsset = new ERC725(LSP4Schema, address, provider, config);
        return await digitalAsset.fetchData('LSP4Metadata');
      } catch (error) {
        console.log('Could not fetch asset data: ', error);
      }
    }

    fetchAssetData(walletsAssets[2]).then(assetData => {
      console.log(
        JSON.stringify(assetData, undefined, 2),
        'this is complete data from useEffect',
      );

      const getCollectionDescription = () => {
        let collectionDescription = JSON.stringify(
          assetData.value.LSP4Metadata.description,
        );
        setnftDescription(collectionDescription);
      };
      getCollectionDescription();
      console.log(
        nftDescription,
        'this is nft description after setting state',
      );

      // console.log(
      //   JSON.stringify(assetData.value.LSP4Metadata.images[0][0].url),
      //   'image urls of collection in collectibles',
      // );

      let nftImageUrls = [];

      assetData.value.LSP4Metadata.images.map(image => {
        // console.log(image[0].url, 'images mapped out');
        nftImageUrls.push(image[0].url);
        setnftUrls(nftImageUrls);
      });

      console.log(nftUrls, 'set state of nft image urls');
      console.log(nftImageUrls, 'nft image urls mapped and placed into array');

      filteredNft.push(collectionDescription, nftImageUrls);
      console.log(filteredNft, 'this is the filtered nft data');

      getAssetProperties(assetData);
      // let nftUrl = JSON.stringify(
      //   assetData.value.LSP4Metadata.images[0][0].url,
      // );
      // setnftAssets(nftUrl);
      setnftAssets(JSON.stringify(assetData.value.LSP4Metadata));
      console.log(nftAssets, 'updated nftAssets without url');
    });
  }, []);

  _renderItem = ({item, index}) => {
    let {itemStyle, itemText} = styles;
    return (
      <View style={itemStyle}>
        {/* <NftView item={item} key={item.key} /> */}
        <NftView
          item={item}
          key={item.key}
          nftUrls={nftUrls}
          nftDescription={nftDescription}
        />
        {/* <Text style={itemText}>{}</Text> */}
      </View>
    );
  };
  let {container, itemText} = styles;
  return (
    <View style={container}>
      <View>
        <Text style={styles.itemSmallText}>{nftDescription}</Text>
      </View>
      <FlatList
        data={nftsamples}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#181818',
  },
  itemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 400,
    borderRadius: 15,
    // height: WIDTH / numColumns,
  },
  itemText: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
  itemSmallText: {
    fontWeight: '800',
    fontSize: 12,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
});

export default Collectibles;
