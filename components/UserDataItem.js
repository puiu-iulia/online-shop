import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Card from './Card';

const UserDataItem = props => {

  return (
    <View style={styles.dataItem}>
        <Text style={styles.smallText}>{props.smallText}</Text>
        <Text style={styles.bigText}>{props.bigText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    dataItem: {
        flex: 1,
        marginVertical: 16
    },
    smallText: {
        fontFamily: 'montserrat',
        fontSize: 12,
        color: 'white'
    },
    bigText: {
        fontFamily: 'montserrat',
        fontSize: 16,
        color: 'white'
    }  
});

export default UserDataItem;