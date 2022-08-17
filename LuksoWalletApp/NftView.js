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
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>{item.price}</Text>
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
    fontSize: 18,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NftView;
