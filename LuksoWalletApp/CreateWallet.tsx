import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
  useAssetVault, 
  useDispatch, 
  useNftVault, 
  useProfile, 
  useWallet 
} from './hooks';
import { getMnemonic, recoverWalletWithMnemonicKey } from './utils/wallet';

import { store } from './store'
import { deployUniversalProfile, deployVaults, deployVaults2 } from './utils/lukso';

const CreateWallet = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const [seedPhrase, setSeedPhrase] = useState('')
  const dispatch = useDispatch(store)
  const wallet = useWallet(store)
  const profile = useProfile(store)
  const nftVault = useNftVault(store)
  const assetVault = useAssetVault(store)

  console.log('wallet', wallet)
  console.log('profile', profile)
  console.log('assetVault', assetVault)
  console.log('nftVault', nftVault)

  useEffect(() => {
    try {
      setLoading(true)
      const mnemonic = getMnemonic()
      setSeedPhrase(mnemonic)

      recoverWalletWithMnemonicKey(dispatch, mnemonic)
    } catch (error) {
      console.log('Error creating wallet', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const savedAlert = () => {
    Alert.alert(
      'Written the Secret Recovery Phrase down?',
      "Without the secret recovery phrase you will not be able to access your key or any assets associated with it.",
      [{
        text: "Cancel",
        onPress: () => console.log("Cancelled"),
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => onSavedRecoveryPhrase()
      }]
    )
  }

  const onSavedRecoveryPhrase = async () => {
    setLoading(true)

    if (!wallet) return console.log('No wallet found!') // Do something? show alert?

    try {
      const profileAddress = await deployUniversalProfile(dispatch, wallet?.address)

      if (!profileAddress) throw Error('Universal Profile failed to deploy correctly')

      console.log('profile address', profileAddress)
      await deployVaults(dispatch, profileAddress)

      if (wallet) {
        navigation.navigate('Dashboard')
      }

    } catch (err) {
      console.log('Error while deploying contracts')
    } finally {
      setLoading(false)
    }
  }

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.indexText}>{`${index + 1}.   `}</Text><Text style={styles.itemText}>{item}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Secret Recovery Phrase</Text>
        <Text style={styles.subText}>
          This is the only way you will be able to recover your account.
          Please store it somewhere safe!
        </Text>
      </View>

      <FlatList
        data={seedPhrase.split(' ')}
        renderItem={renderItem}
        numColumns={2}
        style={styles.listContainer}
        contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      />

      <TouchableOpacity style={styles.copyView}>
        <MaterialCommunityIcon name="content-copy" size={20} color="#FFFFFF" />
        <Text style={styles.copyText}>Copy to clipboard</Text>
      </TouchableOpacity>

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={savedAlert}
          style={styles.buttonStyle}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Ok, I saved it somewhere</Text>
            )
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CreateWallet

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1c1c",
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 18
  },
  mainText: {
    color: "#FFFFFF",
    fontSize: 28,
    marginBottom: 18,
    fontWeight: "bold"
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
    letterSpacing: .5
  },
  listContainer: {
    maxHeight: 320, 
    alignSelf: "stretch",
    marginHorizontal: 18,
  },
  itemContainer: {
    marginHorizontal: 10,
    marginVertical: 6,
    flexDirection: "row",
    width: 160,
    backgroundColor: "#191919",
    paddingVertical: 10,
    paddingLeft: 25,
    justifyContent: "flex-start",
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: .2,
    alignSelf: "stretch"
  },
  indexText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  },
  copyView: {
    flexDirection: "row",
  },
  copyText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 18,
    marginBottom: 20
  },
  buttonStyle: {
    backgroundColor: '#0892d0',
    paddingVertical: 15,
    borderRadius: 25,
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  }
})