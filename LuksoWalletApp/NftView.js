import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';

const NftView = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View>
      <Image
        source={{uri: item.image}}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />
      <View>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </View>
  );
};
// const NftView = ({item}) => {
//   const {width} = useWindowDimensions();
//   return (
//     <View style={[styles.container, {width}]}>
//       <Image
//         source={{uri: item.image}}
//         style={[styles.image, {width, resizeMode: 'contain'}]}
//       />
//       <View style={{flex: 0.3}}>
//         <Text style={styles.title}>{item.name}</Text>
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
});

export default NftView;
