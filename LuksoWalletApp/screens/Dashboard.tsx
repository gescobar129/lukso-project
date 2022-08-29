import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

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

const Dashboard = ({navigation}) => {
  const wallet = useWallet(store);
  const profile = useProfile(store);
  const assetVault = useAssetVault(store);
  const nftVault = useNftVault(store);
  const dispatch = useDispatch(store);
  const totalBalance = useTotalBalance(store);

  const [modalVisible, setIsModalVisible] = useState(false);
  const [depositDest, setDepositDest] = useState<string>(wallet?.address || '');

  useEffect(() => {
    const getBalances = async () => {
      // await fetchLuksoBalances({ wallet, profile, assetVault }, dispatch)
      // await setupURD(wallet, assetVault.address, profile.address)
      await deployMonster(wallet?.address || '');
      // await testtokens()
    };

    try {
      getBalances();
    } catch (err) {
    } finally {
    }
  }, []);

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
