import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const Input = ({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  autoCapitalize,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
};

Input.defaultProps = {
  secureTextEntry: false,
  autoCapitalize: 'none',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 2,
    fontSize: 18,
    paddingLeft: 20,
  },
  input: {
    flex: 5,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  },
});

export { Input };
