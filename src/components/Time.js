import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import moment from 'moment/min/moment-with-locales.min';

import {time as styles} from '../styles/styles.js'

export default class Time extends Component {
  render() {
    const position = this.props.position
    const timestamp = this.props.currentSlide.inserted_at
    const username = this.props.currentSlide.user.hash || '';
    const lang = this.context.getLocale()
    // console.log("timestamp")
    // console.log(timestamp)
    return (
      <View style={styles[position].container}>
        <Text style={styles[position].text}>
          {username}, {moment(timestamp).locale(lang).format('LT')}
        </Text>
      </View>
    );
  }
}


Time.contextTypes = {
  getLocale: PropTypes.func,
};

Time.defaultProps = {
  position: 'left',
  currentSlide: {
    timestamp: null,
  },
};
