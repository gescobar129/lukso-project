import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import NftView from './NftView';
import nftsamples from './nftsamples';
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
// Debug

// fetchAssetData(SAMPLE_ASSET_ADDRESS).then(assetData => {
//   console.log(
//     JSON.stringify(assetData.value.LSP4Metadata.images[0][0].url, undefined, 2),
//   );
//   getAssetProperties(assetData);
// });

/* create a useEffect hook and call the promise from fetchData
within a useEffect hook in this file

call the function within this component so you can use the useState hook
to save the NFT array to the local state of this component

reference createWallet component, look at the useEffect hook to create
the mnemonic we call getmnemonic and then call setSeedPhrase to save
the phrase to the local state so it can be rendered on line 108

for the collectibles fetchdata type function you will need to have
your function return the array of NFTs (the static nftsamples array
for now until it is done dynamically)
then save it to the local state of collectibles and render it
make sure to call your promise within a useEffect

rather than creating array outside of the promise (doesnt work)
create the array within the then statement and modify it there)
then save it to the local state of the collectibles component
*/

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
    fetchOwnedAssets(SAMPLE_PROFILE_ADDRESS).then(ownedAssets => {
      setwalletsAssets(ownedAssets);
    });
  }, []);

  console.log(walletsAssets, 'send me the addy im litt!!!!!!!!!!!!!!!!!!!!');
  let walletAddresses = [];
  walletsAssets.map(addy => walletAddresses.push(addy));
  // console.log(walletAddresses[2], 'the address I need');

  async function fetchAssetData(address) {
    try {
      const digitalAsset = new ERC725(LSP4Schema, address, provider, config);
      return await digitalAsset.fetchData('LSP4Metadata');
    } catch (error) {
      console.log('Could not fetch asset data: ', error);
    }
  }

  // console.log(nftAssets);
  let filteredNft = [];

  useEffect(() => {
    fetchAssetData(walletAddresses[2]).then(assetData => {
      // console.log(
      //   JSON.stringify(
      //     assetData.value.LSP4Metadata.images[0][0].url,
      //     undefined,
      //     2,
      //   ),
      //   'this is from useEffect',
      // );
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

      // let collectionUrls = JSON.stringify(
      //   assetData.value.LSP4Metadata.images[0][0].url,
      // );

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
        <Text>{nftDescription}</Text>
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
  },
  itemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: WIDTH / numColumns,
  },
  itemText: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
});
// const Collectibles = ({navigation}) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const scrollX = useRef(new Animated.Value(0)).current;

//   const viewableItemsChanged = useRef(({viewableItems}) => {
//     setCurrentIndex(viewableItems[0].index);
//   }).current;

//   const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={nftsamples}
//         renderItem={({item}) => <NftView item={item} key={item.key} />}
//         horizontal
//         showsHorizontalScrollIndicator
//         pagingEnabled
//         bounces={false}
//         keyExtractor={item => item.key}
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {x: scrollX}}}],
//           {
//             useNativeDriver: false,
//           },
//         )}
//         scrollEventThrottle={32}
//         onViewableItemsChanged={viewableItemsChanged}
//         viewabilityConfig={viewConfig}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flex: 1,
//     justifyContent: 'flex-start',
//     backgroundColor: '#ffffff',
//   },
//   textContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     marginTop: 50,
//     marginHorizontal: 18,
//   },
//   mainText: {
//     color: '#FFFFFF',
//     fontSize: 28,
//     marginBottom: 18,
//     fontWeight: 'bold',
//   },
//   subText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     marginBottom: 18,
//     textAlign: 'center',
//     color: 'grey',
//     letterSpacing: 0.5,
//   },
//   input: {
//     height: 100,
//     margin: 15,
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//     color: '#FFFFFF',
//     fontSize: 16,
//     paddingTop: 10,
//     lineHeight: 25,
//     borderColor: 'grey',
//     backgroundColor: '#191919',
//     borderWidth: 0.5,
//     fontWeight: '500',
//   },
//   mainButtonView: {
//     flexDirection: 'row',
//     marginHorizontal: 18,
//   },
//   buttonStyle: {
//     backgroundColor: '#0892d0',
//     paddingVertical: 15,
//     borderRadius: 25,
//     display: 'flex',
//     flex: 1,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   squareRatio: {
//     width: '95%',
//     aspectRatio: 1,
//   },
// });

export default Collectibles;
