import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import NftView from './NftView';
import nftsamples from './nftsamples';
import {CurrentRenderContext} from '@react-navigation/native';

const numColumns = 2;
const WIDTH = Dimensions.get('window').width;

const Collectibles = () => {
  _renderItem = ({item, index}) => {
    let {itemStyle, itemText} = styles;
    return (
      <View style={itemStyle}>
        <NftView item={item} key={item.key} />
        {/* <Text style={itemText}>{item.key}</Text> */}
      </View>
    );
  };
  let {container, itemText} = styles;
  return (
    <View style={container}>
      <FlatList
        data={nftsamples}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  itemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: WIDTH / numColumns,
  },
  itemText: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
});
// const Collectibles = ({navigation}) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const scrollX = useRef(new Animated.Value(0)).current;

//   const viewableItemsChanged = useRef(({viewableItems}) => {
//     setCurrentIndex(viewableItems[0].index);
//   }).current;

//   const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={nftsamples}
//         renderItem={({item}) => <NftView item={item} key={item.key} />}
//         horizontal
//         showsHorizontalScrollIndicator
//         pagingEnabled
//         bounces={false}
//         keyExtractor={item => item.key}
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {x: scrollX}}}],
//           {
//             useNativeDriver: false,
//           },
//         )}
//         scrollEventThrottle={32}
//         onViewableItemsChanged={viewableItemsChanged}
//         viewabilityConfig={viewConfig}
//       />
//     </View>
//   );
// };

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
//   squareRatio: {
//     width: '95%',
//     aspectRatio: 1,
//   },
// });

export default Collectibles;
