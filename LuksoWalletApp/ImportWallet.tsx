import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { 
  useDispatch,
  useWallet
} from './hooks';
import { recoverWalletWithMnemonicKey } from './utils/wallet';
import { deployUniversalProfile, deployVaults } from './utils/lukso';

import { store } from './store'

const ImportWallet = ({navigation}: any) => {
  const [recoveryPhrase, setRecoveryPhrase] = useState(" ")
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(store);
  const wallet = useWallet(store);


  const onRecoveryPhraseSubmit = async () => {
    setLoading(true)

    try {
      recoverWalletWithMnemonicKey(dispatch, recoveryPhrase)
    
      const profileAddress = await deployUniversalProfile(dispatch, wallet?.address)

      if (!profileAddress) throw Error('Universal Profile failed to deploy correctly')

      console.log('profile address', profileAddress)

      await deployVaults(dispatch, profileAddress)

      if (profileAddress) {
        navigation.navigate('Dashboard')
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Secret Recovery Phrase</Text>
        <Text style={styles.subText}>Restore an existing wallet with your 12 word secret recovery phrase</Text>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={(event) => setRecoveryPhrase(event)}
        value={recoveryPhrase}
        placeholder="Secret Recovery Phrase"
        placeholderTextColor="grey"
        multiline
      />

      <View style={styles.mainButtonView}>
        <TouchableOpacity
          onPress={() => onRecoveryPhraseSubmit()}
          style={styles.buttonStyle}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Import Secret Recovery Phrase</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ImportWallet

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#1b1c1c",
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
    marginBottom: 18,
    textAlign: "center",
    color: "grey",
    letterSpacing: .5
  },
  input: {
    height: 100,
    margin: 15,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    color: "#FFFFFF",
    fontSize: 16,
    paddingTop: 10,
    lineHeight: 25,
    borderColor: "grey",
    backgroundColor: "#191919",
    borderWidth: .5,
    fontWeight: "500"
  },
  mainButtonView: {
    flexDirection: 'row',
    marginHorizontal: 18,
  },
  buttonStyle: {
    backgroundColor: '#0892d0',
    paddingVertical: 15,
    borderRadius: 25,
    display: "flex",
    flex: 1,
    alignItems: "center"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
