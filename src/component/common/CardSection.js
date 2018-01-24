import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const CardSection = ({ children, style }) => {
  return (
    <View style={[styles.containerStyle, style]}>
      {children}
    </View>
  );
};

CardSection.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

CardSection.defaultProps = {
  style: StyleSheet.create({}),
};

const styles = StyleSheet.create({
  containerStyle: {
    borderColor: '#ddd',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
});

export { CardSection };

