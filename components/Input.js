import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// const INPUT_CHANGE = 'INPUT_CHANGE';

// const inputReducer = (state, action) => {
//   switch (action.type) {
//     case INPUT_CHANGE:
//       return {
//         ...state,
//         value: action.value
//       };
//     default:
//       return state;
//   }
// };

const Input = props => {
  // const [inputState, dispatch] = useReducer(inputReducer, {
  //   value: props.initialValue ? props.initialValue : '',
  // });

  // const { onInputChange, id } = props;

  // useEffect(() => {
  //     onInputChange(id, inputState.value);
  // }, [inputState, onInputChange, id]);

  // const textChangeHandler = text => {
  //   dispatch({ type: INPUT_CHANGE, value: text });
  // };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={{...styles.input, ...props.style}}
        value={props.value}
        // onChangeText={textChangeHandler}
      />
      {/* {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )} */}
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
  },
  // errorText: {
    // fontFamily: 'open-sans',
  //   color: 'red',
  //   fontSize: 13
  // }
});

export default Input;
