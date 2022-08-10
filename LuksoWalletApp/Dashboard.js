import React from 'react'
import { 
  StyleSheet,
  View, 
  SafeAreaView, 
  Text, 
  TouchableOpacity
} from 'react-native';


const Dashboard = ({ navigation }) => {

  const onDeposit = () => {
    console.log('execute deposit')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => console.log('wallet address copied!')}
        >
          <Text style={styles.walletText}>0xfjatfa432ng5g02nFMD</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>$0.00</Text>
      </View>

      <View style={styles.mainButtons}>
        <TouchableOpacity
          onPress={onDeposit}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText} >Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectToken')}
          style={{...styles.buttonStyle, marginLeft: 15}}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#1b1c1c'
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  walletText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
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
    color: '#FFFFFF'
  },
  mainButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15
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