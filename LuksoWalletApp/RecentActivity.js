import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import Web3 from 'web3';

// Import and network setup
import {ERC725} from '@erc725/erc725.js';
import UniversalProfileSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import LSP4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

// Static variables
const SAMPLE_PROFILE_ADDRESS = '0xF7f6253011Da57Cb1c226E0774eF4e50330a667D';
const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';

// Parameters for the ERC725 instance
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = {ipfsGateway: IPFS_GATEWAY};

// https://explorer.execution.l16.lukso.network/api?module=account&action=txlist&address=0xF7f6253011Da57Cb1c226E0774eF4e50330a667D
let txApiLink =
  'https://explorer.execution.l16.lukso.network/api?module=account&action=txlist&address=0xF7f6253011Da57Cb1c226E0774eF4e50330a667D';

const RecentActivity = () => {
  const [fetchedTxs, setfetchedTxs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // const [fetchedHashes, setfetchedHashes] = useState([]);
  // console.log(fetchedTxs[0].hash, 'fetched hash from use effect');
  let hashesArray = [];
  let datesArray = [];

  fetchedTxs.map(tx => hashesArray.push(tx.hash));
  fetchedTxs.map(tx => datesArray.push(tx.timeStamp));
  // console.log(new Date(1660870933 * 1000), 'this is the date');
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>{'\n'}</Text>
        <View
          style={{
            borderBottomColor: '#D4D4D4',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      {useEffect(() => {
        fetch(
          'https://explorer.execution.l16.lukso.network/api?module=account&action=txlist&address=0xF7f6253011Da57Cb1c226E0774eF4e50330a667D',
        )
          .then(response => response.json())
          .then(data => setfetchedTxs(data.result));
      }, [])}
      <View>
        {fetchedTxs.map(tx => {
          let readableDate = JSON.stringify(new Date(tx.timeStamp * 1000));
          return (
            <View>
              <View style={modalstyles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={modalstyles.centeredView}>
                    <View style={modalstyles.modalView}>
                      <Text style={modalstyles.modalText}>{tx.hash}</Text>
                    </View>
                  </View>
                  <Pressable
                    style={[modalstyles.button, modalstyles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={modalstyles.textStyle}>Close</Text>
                  </Pressable>
                </Modal>
              </View>
              <View style={[styles.mainButtons, styles.mainCardView]}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.buttonText}>{readableDate}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default RecentActivity;

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
  title: {
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
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
    backgroundColor: '#0892d0',
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
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const modalstyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

// old view
/* <View>
        {datesArray.map(rawDate => {
          let date = new Date(rawDate * 1000).toString();
          console.log(date, 'is this the raw date changed to string?');
          return (
            <View>
              <View style={modalstyles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={modalstyles.centeredView}>
                    <View style={modalstyles.modalView}>
                      <Text style={modalstyles.modalText}>
                        Transaction Here
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    style={[modalstyles.button, modalstyles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={modalstyles.textStyle}>Close</Text>
                  </Pressable>
                </Modal>
              </View>
              <View style={[styles.mainButtons, styles.mainCardView]}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.buttonText}>{date}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View> */
