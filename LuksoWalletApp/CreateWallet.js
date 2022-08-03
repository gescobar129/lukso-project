import React from 'react'
import { 
  View, 
  SafeAreaView, 
  Text, 
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateWallet = () => {

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

  const onSavedRecoveryPhrase = () => {
    console.log('recovery phrase saved')
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

      <TouchableOpacity style={styles.copyView}>
        <MaterialCommunityIcon name="content-copy" size={20} color="#FFFFFF" />
        <Text style={styles.copyText}>Copy to clipboard</Text>
      </TouchableOpacity>

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={savedAlert}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>Ok, I saved it somewhere</Text>
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
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 18,
    textAlign: "center",
    color: "grey",
    letterSpacing: .5
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
    marginHorizontal: 15,
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