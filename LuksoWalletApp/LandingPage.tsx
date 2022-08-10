import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import slides from './slides';
import OnboardingItem from './OnboardingItem';

const LandingPage = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={slides}
          renderItem={({item}) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
        />
      </View>
      <View style={styles.mainButtons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateWallet')}
          style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Create a new wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ImportWallet')}
          style={{...styles.buttonStyle, marginLeft: 15}}>
          <Text style={styles.buttonText}>Import a wallet</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={[styles.textContainer, styles.container]}>
        <Pressable style={(styles.buttonStyle, styles.buttonText)}>
          <Text>Create a new wallet</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ffff',
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
    marginBottom: 100,
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
});

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flex: 1,
//     justifyContent: 'flex-start',
//     backgroundColor: '#ffffff',
//   },
//   textContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     marginTop: 50,
//     marginHorizontal: 18,
//   },
//   mainText: {
//     color: '#FFFFFF',
//     fontSize: 28,
//     marginBottom: 18,
//     fontWeight: 'bold',
//   },
//   subText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     marginBottom: 18,
//     textAlign: 'center',
//     color: 'grey',
//     letterSpacing: 0.5,
//   },
//   input: {
//     height: 100,
//     margin: 15,
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//     color: '#FFFFFF',
//     fontSize: 16,
//     paddingTop: 10,
//     lineHeight: 25,
//     borderColor: 'grey',
//     backgroundColor: '#191919',
//     borderWidth: 0.5,
//     fontWeight: '500',
//   },
//   mainButtonView: {
//     flexDirection: 'row',
//     marginHorizontal: 18,
//   },
//   buttonStyle: {
//     backgroundColor: '#0892d0',
//     paddingVertical: 15,
//     borderRadius: 25,
//     display: 'flex',
//     flex: 1,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
