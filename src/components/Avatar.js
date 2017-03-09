import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

import {avatar as styles} from '../styles/styles.js'
import CustomAvatar from './CustomAvatar';

import pingalAvatar from '../lib/images/pingal_play.png'

export default class Avatar extends Component {
  renderAvatar() {
    const position = this.props.position
    const user = this.props.currentSlide.user
    if (this.props.currentSlide.user._id == 1) {
      return <Image 
                source={pingalAvatar} 
                style={{height: 42, width: 42}}
              />
    } else {
      return (
        <CustomAvatar
          avatarStyle={styles[position].image}
          user={user}
        />
      );
    }
  }

  render() {
    const isSameUser = this.props.isSameUser
    const isSameDay = this.props.isSameDay
    const currentSlide = this.props.currentSlide
    const nextSlide = this.props.nextSlide
    const position = this.props.position

    if (isSameUser(currentSlide, nextSlide) && isSameDay(currentSlide, nextSlide)) {
      return (
        <View style={styles[position].container}>
          <CustomAvatar
            avatarStyle={styles[position].image}
          />
        </View>
      );
    }
    return (
      <View style={styles[position].container}>
        {this.renderAvatar()}
      </View>
    );
  }
}

Avatar.defaultProps = {
  isSameDay: () => {},
  isSameUser: () => {},
  position: 'left',
  currentSlide: {
    user: null,
  },
  nextSlide: {},
};
