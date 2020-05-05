import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions
} from 'react-native';

import Card from './Card';
import CustomLinearGradient from './CustomLinearGradient';

const Product = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <CustomLinearGradient></CustomLinearGradient>
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
              <Text style={styles.price}>{props.price} RON</Text>
            </View>
            {/* <View style={styles.actions}>
              {props.children}
            </View> */}
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: Dimensions.get('window').height/2.4,
    width: Dimensions.get('window').width/2.22,
    marginVertical: 8,
    marginLeft: 12, 
    backgroundColor: '#f1f1f3'
  },
  touchable: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').height/3.3,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: Dimensions.get('window').height/4,
    padding: 8
  },
  title: {
    fontFamily: 'playfair',
    fontSize: 20,
    marginVertical: 2
  },
  price: {
    fontFamily: 'montserrat',
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  // actions: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: '23%',
  //   paddingHorizontal: 20,
  //   marginTop: 2
  // }
});

export default Product;
