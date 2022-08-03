import React, { useState } from 'react'
import { 
  View, 
  SafeAreaView, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';

const ImportWallet = () => {
  const [recoveryPhrase, setRecoveryPhrase] = useState(null);

  const onRecoveryPhraseSubmit = () => {
    console.log('recovery phrase', recoveryPhrase)
    console.log('Imported secret phrase')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Secret Recovery Phrase</Text>
        <Text style={styles.subText}>Restore an existing wallet with your 12 or 24-word secret recovery phrase</Text>
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
          onPress={onRecoveryPhraseSubmit}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>Import Secret Recovery Phrase</Text>
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
    color: "#FFFFFF",
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
