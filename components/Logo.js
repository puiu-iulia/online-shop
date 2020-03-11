
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';

const Logo = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        marginLeft: 48,
        alignItems: 'center',
        alignContent: 'center'
      }}>
        <Text 
          style={{
            marginBottom: 4,
            fontSize: 24,
            color: Colors.accent,
            textTransform: 'uppercase',
            fontFamily: 'playfair',
            fontWeight: '400'
          }}
        >G a r d e n i a</Text>
      </View>
    );
  }

export default Logo;