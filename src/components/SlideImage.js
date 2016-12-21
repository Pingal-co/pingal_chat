import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';

import {slide_image as styles} from '../styles/styles.js'

export default class SlideImage extends Component {
  render() {
    const image = this.props.currentSlide.image
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: image}}
        />
      </View>
    );
  }
}


SlideImage.defaultProps = {
  currentSlide: {
    image: null,
  },
};
