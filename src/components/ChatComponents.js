import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {avatar as avatarStyle, day as dayStyle, time as timeStyle, load_earlier as loadEarlierStyle, sendButton as sendStyle} from '../styles/styles.js'

import moment from 'moment/min/moment-with-locales.min';


class Avatar extends Component {

  setAvatarColor() {
    const userName = this.props.user.hash || '';
    const name = userName.toUpperCase().split(' ');
    if (name.length === 1) {
      this.avatarName = `${name[0].charAt(0)}`;
    } else if (name.length > 1) {
      this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
    } else {
      this.avatarName = '';
    }

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

  renderInitials() {
    const textStyle = this.props.textStyle
    return (
      <Text style={[defaultStyles.textStyle, textStyle]}>
        {this.avatarName}
      </Text>
    );
  }


  renderAvatar(avatarStyle) {
    const avatar = this.props.currentSlide.user.avatar
    
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

  renderCustomAvatar(){
    const isSameUser = this.props.isSameUser
    const isSameDay = this.props.isSameDay
    const currentSlide = this.props.currentSlide
    const nextSlide = this.props.nextSlide
    const position = this.props.position
    const user = this.props.currentSlide.user
    const {onPress, ...other} = this.props;
    

    if (isSameUser(currentSlide, nextSlide) && isSameDay(currentSlide, nextSlide)) {
      return (
        <View style={styles[position].container}>
            <View style={[
                defaultStyles.avatarStyle,
                {backgroundColor: 'transparent'},
                avatarStyle,
            ]}/>
        </View>
      );
    }

    const name = user.name
    const avatar = user.avatar

    // avatar present
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

    // name but not avatar 
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


  render() {   
    const position = this.props.position 
    return (
      <View style={styles[position].container}>
        {this.renderCustomAvatar()}
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
  onPress: null,
  avatarStyle: {},
  textStyle: {},
};

class Day extends Component {
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

class Time extends Component {
  render() {
    const position = this.props.position
    const timestamp = this.props.currentSlide.inserted_at
    const lang = this.context.getLocale()

    return (
      <View style={styles[position].container}>
        <Text style={styles[position].text}>
          {moment(timestamp).locale(lang).format('LT')}
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

class LoadEarlier extends Component {
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

class Send extends Component {
  render() {
    const text= this.props.text
    const onSend = this.props.onSend
    const name = this.props.name
  

    if (text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => { onSend({text: text}, true); }}
        >
          <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
      );
    }
    return <View/>;
  }
}


Send.defaultProps = {
  text: '',
  onSend: () => {},
  name: 'Send',
};

export {
  Avatar, 
  Day,
  Time,
  LoadEarlier,
  Send,  
};
