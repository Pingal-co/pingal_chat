
import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {custom_avatar as defaultStyles} from '../styles/styles.js'
// TODO
// 3 words name initials
// handle only alpha numeric chars

class CustomAvatar extends Component {
  setAvatarColor() {
    const userName = this.props.user.hash || '';
    const name = userName.toUpperCase().split(' ');
    console.log("user name: ", name)
    console.log(this.props.user)

    if (name.length === 1) {
      this.avatarName = `${name[0].charAt(0)}`;
    } else if (name.length > 1) {
      this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
    } else {
      this.avatarName = '';
    }

    console.log(this.avatarName)

    let sumChars = 0;
    for(let i = 0; i < userName.length; i++) {
      sumChars += userName.charCodeAt(i);
    }

    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [
      '#e67e22', // carrot
      '#2ecc71', // emerald
      '#3498db', // peter river
      '#8e44ad', // wisteria
      '#e74c3c', // alizarin
      '#1abc9c', // turquoise
      '#2c3e50', // midnight blue
    ];

    this.avatarColor = colors[sumChars % colors.length];
  }

  renderAvatar() {
    const avatar = this.props.user.avatar
    const avatarStyle = this.props.avatarStyle

    if (typeof avatar === 'function') {
      return avatar();
    } else if (typeof avatar === 'string') {
      return (
        <Image
          source={{uri: avatar}}
          style={[defaultStyles.avatarStyle, avatarStyle]}
        />
      );
    }
    return null;
  }

  renderInitials() {
    const textStyle = this.props.textStyle
    return (
      <Text style={[defaultStyles.textStyle, textStyle]}>
        {this.avatarName}
      </Text>
    );
  }

  render() {
    const name = this.props.user.name
    const avatar = this.props.user.avatar
    const avatarStyle = this.props.avatarStyle
    const {onPress, ...other} = this.props;

    if (!name && !avatar) {
      // render placeholder
      return (
        <View style={[
          defaultStyles.avatarStyle,
          {backgroundColor: 'transparent'},
          avatarStyle,
        ]}/>
      )
    }
    if (avatar) {
      return (
        <TouchableOpacity
          disabled={onPress ? false : true}
          onPress={() => {
            const {onPress, ...other} = this.props;
            onPress && onPress(other);
          }}
        >
          {this.renderAvatar()}
        </TouchableOpacity>
      );
    }

    if (!this.avatarColor) {
      this.setAvatarColor();
    }

    return (
      <TouchableOpacity
        disabled={onPress ? false : true}
        onPress={() => {
          onPress && onPress(other);
        }}
        style={[
          defaultStyles.avatarStyle,
          {backgroundColor: this.avatarColor},
          avatarStyle,
        ]}
      >
        {this.renderInitials()}
      </TouchableOpacity>
    );
  }
}

CustomAvatar.defaultProps = {
  user: {
    name: null,
    avatar: null,
  },
  onPress: null,
  avatarStyle: {},
  textStyle: {},
};


export default CustomAvatar;
