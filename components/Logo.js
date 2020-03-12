
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';

const Logo = props => {
    return (
      <View style={styles.view}>
        <Text style={{...styles.logo, ...props.style}}>{props.title}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      marginBottom: 4,
      fontSize: 24,
      color: Colors.accent,
      textTransform: 'uppercase',
      fontFamily: 'playfair',
      fontWeight: '400'
    }
  }); 

export default Logo;