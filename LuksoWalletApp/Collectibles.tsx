import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {Card, Layout, Avatar, Divider} from '@ui-kitten/components';

const {ERC725} = require('@erc725/erc725.js');
const erc725schema = require('@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json');
const Web3 = require('web3');
require('isomorphic-fetch');
const LSP4Schema = require('@erc725/erc725.js/schemas/LSP4DigitalAsset.json');
const LSP4 = require('@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json');

const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';
const SAMPLE_PROFILE_ADDRESS = '0xF7f6253011Da57Cb1c226E0774eF4e50330a667D';

const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = {ipfsGateway: IPFS_GATEWAY};

const Collectibles = () => {
  const [nftAddresses, setnftAddresses] = useState([]);
  const [stringAddresses, setstringAddresses] = useState([]);
  const [nftData, setnftData] = useState([]);
  const [nftDescription, setnftDescription] = useState(null);
  const [nftAddress1, setnftAddress1] = useState('');
  const [nftAddress2, setnftAddress2] = useState('');
  const [nftAddress3, setnftAddress3] = useState('');

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
    fetchOwnedAssets(SAMPLE_PROFILE_ADDRESS).then(ownedAssets =>
      setnftAddresses(ownedAssets),
    );
  }, []);
  // console.log(JSON.stringify(ownedAssets, undefined, 2)),

  let stringAddy = [];
  nftAddresses.map(addy => {
    return stringAddy.push(JSON.stringify(addy, undefined, 2));
  });

  async function fetchAssetData(address) {
    try {
      const digitalAsset = new ERC725(LSP4Schema, address, provider, config);
      return await digitalAsset.fetchData('LSP4Metadata');
    } catch (error) {
      console.log('Could not fetch asset data: ', error);
    }
  }

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

  let stringifiedLoop = [];

  for (let i = 0; i < stringAddy.length; i++) {
    stringifiedLoop.push(
      JSON.stringify(new ERC725(LSP4Schema, stringAddy[i], provider, config)),
    );
  }

  fetchAssetData('0x03b1F882f65aF390085a4c13715214ab6116b4AE').then(
    assetData => {
      setnftAddress1(
        JSON.stringify(assetData.value.LSP4Metadata.images[0][0].url),
      );
    },
  );
  fetchAssetData('0xb5fd6425C0B2824AAd2422Ebc00F2f94693fDDa7').then(
    assetData => {
      setnftAddress2(
        JSON.stringify(assetData.value.LSP4Metadata.images[0][0].url),
      );
    },
  );
  fetchAssetData('0xB3F00730367CC952e328eb43AC2E4B18050e6665').then(
    assetData => {
      setnftAddress3(
        JSON.stringify(assetData.value.LSP4Metadata.images[0][0].url),
      );
    },
  );

  // console.log(nftAddress1, nftAddress2, nftAddress3, 'all nft addresses set');
  console.log(nftAddress1.replace('ipfs://', IPFS_GATEWAY));
  let nftLink1 = nftAddress1.replace('ipfs://', IPFS_GATEWAY);
  console.log(nftLink1, 'this is nft link 1');
  console.log(nftAddress2.replace('ipfs://', IPFS_GATEWAY));
  let nftLink2 = nftAddress2.replace('ipfs://', IPFS_GATEWAY);
  console.log(nftLink2, 'this is nft link 2');
  console.log(nftAddress3.replace('ipfs://', IPFS_GATEWAY));
  let nftLink3 = nftAddress3.replace('ipfs://', IPFS_GATEWAY);
  console.log(nftLink1, nftLink2, nftLink3, 'all nft links');

  return (
    <Layout style={styles.container}>
      <Layout style={styles.layout}>
        <Card style={styles.card}>
          <Avatar
            source={{
              uri: 'https://2eff.lukso.dev/ipfs/QmXgvYtAResMTbz6jCeADrTSWjn7N8zxz1WNTV1qXvUcpk',
            }}
            size="giant"
          />
          <Text style={styles.itemText}>Universal Page NFT</Text>
        </Card>
        <Card style={styles.card}>
          <Avatar
            source={{
              uri: 'https://2eff.lukso.dev/ipfs/QmXZbGQpAehiLDdi36B9xF1yKeFjDa9ZvTVmy7KuSRZ8Pu',
            }}
            size="giant"
          />
          <Text style={styles.itemText}>Animorph NFT</Text>
        </Card>
        <Card style={styles.card}>
          <Avatar
            source={{
              uri: 'https://2eff.lukso.dev/ipfs/QmbxgJfimkLG5WRDHnbpmkM6rdv9A55QbctWjSwhG5e5cf',
            }}
            size="giant"
          />
          <Text style={styles.itemText}>Matrix NFT</Text>
        </Card>
      </Layout>
      {/* <Layout style={styles.layout} level="4">
      </Layout>
      <Layout style={styles.layout} level="4">
    </Layout> */}
      {/* <View style={styles.container}>
        <Card>
        <View>
        <Avatar
        source={{
          uri: 'https://2eff.lukso.dev/ipfs/QmXZbGQpAehiLDdi36B9xF1yKeFjDa9ZvTVmy7KuSRZ8Pu',
        }}
        size="giant"
        />
        </View>
        <Text style={styles.itemText}>Animorph NFT</Text>
        </Card>
      </View> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  itemText: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    flex: 1,
    margin: 2,
    backgroundColor: '#181818',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     paddingLeft: 30,
//     backgroundColor: '#181818',
//     flexDirection: 'row',
//   },
//   card: {
//     flex: 1,
//     margin: 2,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   itemSmallText: {
//     fontWeight: '800',
//     fontSize: 12,
//     marginBottom: 10,
//     color: '#493d8a',
//     textAlign: 'center',
//   },
//   image: {
//     flex: 0.7,
//     justifyContent: 'center',
//   },
// });

export default Collectibles;
