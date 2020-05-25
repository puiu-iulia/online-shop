import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = props => {

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={{...styles.input, ...props.style}}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'montserrat',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  }
});

export default Input;
