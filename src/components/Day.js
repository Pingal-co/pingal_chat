import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';

import moment from 'moment/min/moment-with-locales.min';

import {day as styles} from '../styles/styles.js'

export default class Day extends Component {
  render() {
    const isSameDay = this.props.isSameDay
    const currentSlide = this.props.currentSlide
    const previousSlide = this.props.previousSlide
    const timestamp = this.props.currentSlide.inserted_at
    const lang = this.context.getLocale()

    if (!isSameDay(currentSlide, previousSlide)) {
      return (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              {moment(timestamp).locale(lang).format('ll').toUpperCase()}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }
}

Day.contextTypes = {
  getLocale: PropTypes.func,
};

Day.defaultProps = {
  isSameDay: () => {},
  currentSlide: {
    // TODO test if crash when timestamp === null
    timestamp: null,
  },
  previousSlide: {},
};
