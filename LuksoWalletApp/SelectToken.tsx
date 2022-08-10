import React from 'react'
import { 
  StyleSheet,
  View, 
  SafeAreaView, 
  Text, 
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';

const SelectToken = ({navigation}: any) => {

  const tokenData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Solana',
      image: "test",
      balance: "12 SOL"
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Ethereum',
      image: "test",
      balance: "120 ETH"
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Lukso',
      image: "test",
      balance: "3400 LUK"
    },
  ];

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Send')}
        style={styles.item}
      >
        <View>
          {/* <Image /> */}
        </View>
        <View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.balance}>{item.balance}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={tokenData}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#1b1c1c',
    flexDirection: "row"
  },
  item: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#333333",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  balance: {
    color: "#FFFFFF"
  },
})

export default SelectToken