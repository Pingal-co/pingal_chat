import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {load_earlier as styles} from '../styles/styles.js'

export default class LoadEarlier extends Component {
  render() {
    const onLoadEarlier = this.props.onLoadEarlier
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          if (onLoadEarlier) { onLoadEarlier(); }
        }}
      >
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            Load earlier slides
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

LoadEarlier.defaultProps = {
  onLoadEarlier: () => {},
};
