import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {sendButton as styles} from '../styles/styles.js'

export default class Send extends Component {
  render() {
    const text= this.props.text
    const onSend = this.props.onSend
    const name = this.props.name
  

    if (text.trim().length > 0) {
      
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => { onSend({text: text}, shouldResetInputToolbar=true, save=true); }}
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
  name: 'Save',
};
