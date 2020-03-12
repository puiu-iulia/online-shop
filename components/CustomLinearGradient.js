import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomLinearGradient = props => {
  return (<LinearGradient 
            style={{...styles.view, ...props.style}}
            colors={['#f5e296', '#926b14', '#f5e296']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            >
            {props.children}
        </LinearGradient>);
};

const styles = StyleSheet.create({
  view: {
    height: 2
  }
});

export default CustomLinearGradient;
