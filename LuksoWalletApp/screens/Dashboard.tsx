import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  useAssetVault,
  useDispatch,
  useNftVault,
  useProfile,
  useTotalBalance,
  useWallet,
} from '../hooks';
import {store} from '../store';
import {
  deployMonster,
  fetchassets,
  fetchLuksoBalances,
  setupURD,
  testtokens,
  transferLuksoToken,
} from '../utils/lukso';
import {Button} from '@ui-kitten/components';
// import { useAssetVault, useDispatch, useNftVault, useProfile, useTotalBalance, useWallet } from '../hooks';
// import { store } from '../store';
// import { deployMonster, fetchassets, fetchLuksoBalances, setupURD, testtokens, transferLuksoToken } from '../utils/lukso';

// const Dashboard = ({navigation}) => {
//   const wallet = useWallet(store);
//   const profile = useProfile(store);
//   const assetVault = useAssetVault(store);
//   const nftVault = useNftVault(store);
//   const dispatch = useDispatch(store);
//   const totalBalance = useTotalBalance(store);

//   const [modalVisible, setIsModalVisible] = useState(false);
//   const [depositDest, setDepositDest] = useState<string>(wallet?.address || '');

const Dashboard = ({navigation}) => {
  const wallet = useWallet(store);
  const profile = useProfile(store);
  const assetVault = useAssetVault(store);
  const nftVault = useNftVault(store);
  const dispatch = useDispatch(store);
  const totalBalance = useTotalBalance(store);

  const [modalVisible, setIsModalVisible] = useState(false);
  const [depositDest, setDepositDest] = useState<string>(wallet?.address || '');
  const [isDeployingMon, setIsDeployingMon] = useState(true);
  const [lukmonAddress, setLukmonAddress] = useState('');

  // TODO: An NFT is deployed everytime the component Mounts.
  // We will leave it like this for Demo purposes. For
  // production, we want to check if the wallet/profile has a
  // Lukmon associated with it. If it does, no deployment is needed
  useEffect(() => {
    const getBalances = async () => {
      // await fetchLuksoBalances({ wallet, profile, assetVault }, dispatch)
      // await setupURD(wallet, assetVault.address, profile.address)
      await deployMonster(wallet?.address || '');

      const address = await deployMonster(wallet?.address || '');

      console.log('DeployedTo', address);

      setTimeout(() => {
        setIsDeployingMon(false);
        setLukmonAddress(address || '');
      }, 6000);

      //  2a2f0b3ead1f50692a8a868ff16a6a34c093dddc
      // await testtokens()
    };

    try {
      getBalances();
    } catch (err) {
    } finally {
    }
  }, []);

  // }, [])

  console.log('Address!@!', lukmonAddress);

  const shortenWalletAddress = (address: string, lastx: number = -5) => {
    const firstFour = address.slice(0, 6);
    const lastFour = address.slice(lastx);
    const shortenedAddress = `${firstFour}...${lastFour}`;
    return shortenedAddress;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => console.log('wallet address copied!')}>
          <Text style={styles.walletText}>
            {shortenWalletAddress(useWallet(store).address)}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>$0.00</Text>
      </View>

      <View style={styles.mainButtons}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectToken')}
          style={{...styles.buttonStyle, marginLeft: 15}}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {isDeployingMon && (
        <View style={styles.monsterItem}>
          <View style={{flex: 1}}>
            <Image
              source={require('../assets/mon-assets/eggshaking.gif')}
              style={{width: 60, height: 60, borderRadius: 15}}
            />
          </View>
          <View style={{flex: 3}}>
            <Text style={styles.itemTitleText}>Minting your Lukmon...</Text>
            <Text style={styles.itemDesc}>
              Please allow 15 - 20 seconds for minting to complete
            </Text>
          </View>
        </View>
      )}

      {lukmonAddress !== '' && (
        <View style={styles.monsterItem}>
          <View style={{flex: 1}}>
            <Icon name="check" color="#27ae60" size={40} />
          </View>
          <View style={{flex: 3}}>
            <Text style={{...styles.itemTitleText, color: '#27ae60'}}>
              Lukmon Mint Completed
            </Text>
            <Text style={{...styles.itemDesc, color: '#27ae60'}}>
              Your Lukmon was minted successfully!
            </Text>
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <TouchableOpacity
          activeOpacity={1.0}
          onPress={() => setIsModalVisible(false)}
          style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={{...styles.walletText, color: 'black'}}>
              {shortenWalletAddress(depositDest)}
            </Text>
            <View style={{marginBottom: 50, marginTop: 50}}>
              {depositDest && <QRCode size={150} value={depositDest} />}
            </View>

            <TouchableOpacity
              onPress={() => setDepositDest(wallet?.address)}
              style={
                wallet?.address == depositDest
                  ? styles.selectedItem
                  : styles.item
              }>
              <View>
                <Text style={styles.itemTitle}>Wallet Address:</Text>
                <Text
                  style={{...styles.walletText, color: 'black', fontSize: 16}}>
                  {shortenWalletAddress(wallet?.address)}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDepositDest(assetVault?.address)}
              style={
                assetVault?.address == depositDest
                  ? styles.selectedItem
                  : styles.item
              }>
              <View>
                <Text style={styles.itemTitle}>Vault A Address:</Text>
                <Text
                  style={{...styles.walletText, color: 'black', fontSize: 16}}>
                  {shortenWalletAddress(assetVault?.address)}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDepositDest(nftVault?.address)}
              style={
                nftVault?.address == depositDest
                  ? styles.selectedItem
                  : styles.item
              }>
              <View>
                <Text style={styles.itemTitle}>Vault B Address:</Text>
                <Text
                  style={{...styles.walletText, color: 'black', fontSize: 16}}>
                  {shortenWalletAddress(nftVault?.address)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#1b1c1c',
  },
  monsterItem: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#333333',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  itemTitleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDesc: {
    color: '#FFFFFF',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  walletText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceContainer: {
    display: 'flex',
    marginTop: 60,
    marginBottom: 40,
  },
  balance: {
    display: 'flex',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#FFFFFF',
  },
  mainButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  buttonStyle: {
    backgroundColor: '#493da8',
    paddingVertical: 15,
    borderRadius: 25,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 50,
  },
  item: {
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#bdc3c7',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  selectedItem: {
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#0892d0',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  itemTitle: {
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 5,
  },
});
