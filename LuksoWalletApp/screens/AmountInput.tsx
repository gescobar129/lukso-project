import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput
} from 'react-native';

const AmountInput = ({navigation, route}: any) => {
  const [amount, setAmount] = useState()
  console.log("paramsssss!!!", route.params)

  const onSend = () => {
    console.log('amount to send submitted')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.walletAddressView}>
        <View style={styles.toView}>
          <Text style={styles.toText}>To:</Text>
          {/* <Text>{route.params}</Text> */}
        </View>

        <View>
          <Text style={styles.input}>{route.params.walletAddress}</Text>
          {/* <TextInput
            style={styles.input}
            onChangeText={(event) => setWalletAddress(event)}
            value={walletAddress}
            placeholder="Address"
            placeholderTextColor="grey"
          /> */}
        </View>
      </View>

      <View style={styles.amountInputContainer}>
        <View style={styles.tokenAmount}>
          <TextInput
            style={styles.inputAmountText}
            onChangeText={(event) => setAmount(event)}
            value={amount}
            placeholder={"0"}
            placeholderTextColor="grey"
          />
          <Text style={styles.tokenNameText}>SOL</Text>
        </View>

        <View>
          <Text style={styles.dollarAmountText}>$0.00</Text>
        </View>

      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={onSend}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default AmountInput

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
  amountInputContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  tokenAmount: {
    flexDirection: "row",
    marginBottom: 8
  },
  inputAmountText: {
    color: "#FFFFFF",
    fontSize: 50,
    fontWeight: "bold",
    marginRight: 10
  },
  tokenNameText: {
    color: "#FFFFFF",
    fontSize: 50,
    fontWeight: "bold"
  },
  dollarAmountText: {
    color: "grey",
    fontSize: 23
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