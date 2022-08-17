import React, {useState} from 'react'
import { 
  StyleSheet,
  View, 
  SafeAreaView, 
  Text, 
  TouchableOpacity,
  TextInput
} from 'react-native';

const Send = ({navigation}: any) => {
  const [walletAddress, setWalletAddress] = useState<undefined | string>(undefined)

  const onWalletAddressSubmit = () => {
    console.log('wallet address', walletAddress)
    console.log('wallet address')
    try {
      navigation.navigate("AmountInput", { walletAddress: walletAddress })
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.walletAddressView}>
        <View style={styles.toView}>
          <Text style={styles.toText}>To:</Text>
        </View>

        <View>
          <TextInput
            style={styles.input}
            onChangeText={(event) => setWalletAddress(event)}
            value={walletAddress}
            placeholder="Address"
            placeholderTextColor="grey"
          />
        </View>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={onWalletAddressSubmit}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Send

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1c1c",
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  walletAddressView: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    borderBottomColor: "grey",
    borderBottomWidth: .3
  },
  toView: {
    marginRight: 6
  },
  toText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold"
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 20
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
})